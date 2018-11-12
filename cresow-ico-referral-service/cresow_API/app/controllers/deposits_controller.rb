class DepositsController < ApplicationController
  respond_to :json
  before_action except: [:complete_deposit] do
    doorkeeper_authorize! :user
  end
  before_action :set_deposit, only: [:update, :destroy]

  # GET /deposits
  def index
    @page = 0
    @take = 999999
    @skip = @take.to_i * @page.to_i 

    if (params.has_key?("page") && params.has_key?("take")) && (!params[:page].blank? && !params[:take].blank?)
        @page = (params[:page].to_i - 1) < 0 ? 0 : (params[:page].to_i - 1)
        @take = params[:take]
        @skip = @take.to_i * @page.to_i 
    end

    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @deposits = Deposit.all
    else
      @deposits = Deposit.where("user_id = ?", @adm.id)
    end

    render :json => {:status => true, :total => @deposits.count, :result => @deposits.offset(@skip).limit(@take).as_json({:include => :user})}
    return
  end

  # GET /deposits/1
  def show
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @deposit = Deposit.find(params[:id])
    else
      @deposit = Deposit.where("user_id = ?", @adm.id)
                        .where("id = ?", params[:id])
                        .first
    end

    render :json => {:status => true, :result => @deposit.as_json({:include => [:user, :coinspayment_transactions, :referral_records]})}
    return
  end

  # POST /deposits
  def create
    @deposit = Deposit.new(deposit_params)
    #GIVE ERROR IF DEPOSIT SENT LESS THAN MINIMUM & MORE THAN MAXIMUM
    if params[:amount_usd].to_f < Referral.all.order(:id).first.min_amount.to_f
      render :json => {:status => false, :error => "Minimum deposit is "+Referral.all.order(:id).first.min_amount.to_s}, status:400
      return
    elsif params[:amount_usd].to_f > Referral.all.order(id: :desc).first.max_amount.to_f
      render :json => {:status => false, :error => "Maximum deposit is "+Referral.all.order(id: :desc).first.max_amount.to_s}, status:400
      return
    end

    if @deposit.save
      #COINSPAYMENT GATEWAY
      response = Coinpayments.create_transaction(@deposit.amount_usd, "USD", "ETH")
      #COINSPAYMENT CREATE TRANSACTION SAMPLE RESPONSE
      # {
      #   "amount"=>"0.00004908", 
      #   "txn_id"=>"CPCJ1WUKETVNUEPQSDAQJX0HLN", 
      #   "address"=>"0x088ef7cdefb39cf80a95c2c5e12779264e38ce3e", 
      #   "confirms_needed"=>"3", 
      #   "timeout"=>86400, 
      #   "status_url"=>"https://www.coinpayments.net/index.php?cmd=status&id=CPCJ1WUKETVNUEPQSDAQJX0HLN&key=9b93af324016926c542fbcdd96fba925", 
      #   "qrcode_url"=>"https://www.coinpayments.net/qrgen.php?id=CPCJ1WUKETVNUEPQSDAQJX0HLN&key=9b93af324016926c542fbcdd96fba925"
      # } 
      unless response.blank?
        response_txn = CoinspaymentTransaction.new
        response_txn.amount = response.amount
        response_txn.transaction_id = response.txn_id
        response_txn.send_to_address = response.address
        response_txn.timeout = response.timeout
        response_txn.status_url = response.status_url
        response_txn.qrcode_url =response.qrcode_url
        response_txn.deposit_id = @deposit.id
        response_txn.save!

        @deposit.amount_eth = response.amount
        @deposit.save!
      end

      if JSON.is_json?(response.to_json)
        validate_response = response.as_json
      else
        validate_response = response.to_s
      end
      
      render :json => {:status => true, :payment_gateway_response => validate_response, :result => @deposit.as_json({:include => :user})}
      return
    else
      render json: @deposit.errors, status: :unprocessable_entity
    end
  end

  def complete_deposit
    if CoinspaymentTransaction.exists?(:transaction_id => params[:txn_id])
      #COINSPAYMENT IPN'S SAMPLE RESPONSE
      # {
      #   "amount1"=>"0.01", 
      #   "amount2"=>"4.978E-5", 
      #   "buyer_name"=>"CoinPayments API", 
      #   "currency1"=>"USD", 
      #   "currency2"=>"ETH", 
      #   "fee"=>"1.0E-5", 
      #   "ipn_id"=>"c09394c9010775f9e522da5ab60345ff", 
      #   "ipn_mode"=>"hmac", 
      #   "ipn_type"=>"api", 
      #   "ipn_version"=>"1.0", 
      #   "merchant"=>"5849e152d20a1ad48995ecadc5d4224f", 
      #   "received_amount"=>"0", 
      #   "received_confirms"=>"0", 
      #   "status"=>"0", 
      #   "status_text"=>"Waiting for buyer funds...", 
      #   "txn_id"=>"CPCJ754MYRWCHEM3VO95ILQ7ZZ"
      # }

      #FETCH PREVIOUS TRANSACTION RECORDS
      previous_txn = CoinspaymentTransaction.where("transaction_id = ?", params[:txn_id]).order(id: :desc).first
      #WRITE ANOTHER RECORDS
      @response_txn = CoinspaymentTransaction.new
      @response_txn.deposit_id = previous_txn.deposit_id
      @response_txn.amount = previous_txn.amount
      @response_txn.transaction_id = previous_txn.transaction_id
      @response_txn.send_to_address = previous_txn.send_to_address
      @response_txn.timeout = previous_txn.timeout
      @response_txn.status_url = previous_txn.status_url
      @response_txn.qrcode_url =previous_txn.qrcode_url

      if params.has_key?("amount1") && !params[:amount1].blank?
        @response_txn.amount_original_currency = params[:amount1]
      end

      if params.has_key?("amount2") && !params[:amount2].blank?
        @response_txn.amount_converted_currency = "%.20f" % (params[:amount2].to_f)
      end
      
      if params.has_key?("currency1") && !params[:currency1].blank?  
        @response_txn.original_currency = params[:currency1]
      end
       
      if params.has_key?("currency2") && !params[:currency2].blank? 
        @response_txn.converted_currency = params[:currency2]
      end
      
      if params.has_key?("fee") && !params[:fee].blank?  
        @response_txn.transaction_fee = "%.20f" % (params[:fee].to_f)
      end
        
      if params.has_key?("status") && !params[:status].blank?  
        @response_txn.status_code = params[:status]
      end
        
      if params.has_key?("status_text") && !params[:status_text].blank?
        @response_txn.status_string = params[:status_text]
      end
        
      if params.has_key?("received_amount") && !params[:received_amount].blank?
        @response_txn.received_amount = params[:received_amount]
      end
        
      if params.has_key?("received_confirms") && !params[:received_confirms].blank?
        @response_txn.received_confirms = params[:received_confirms]
      end

      if @response_txn.save
        #IF PAYMENT SUCCESS WILL AUTO CREATE THE REFERRALS
        if params.has_key?("status") && (params[:status] == 100 || params[:status] == "100")
          unless @response_txn.deposit.blank?
            Deposit.create_referrals(@response_txn.deposit.user_id, @response_txn.amount_original_currency, @response_txn.amount_converted_currency, @response_txn.deposit_id)
          end
        end

        render :nothing => true, :status => 202
      else
        render :json => {:status => false, :result => @response_txn.errors}, status: 400
        return
      end
    else
      render :json => {:status => false, :result => "transaction id not found!"}, status: 404
      return
    end
  end

  # PATCH/PUT /deposits/1
  def update
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      if @deposit.update(deposit_params)
        render :json => {:status => true, :result => @deposit.as_json({:include => [:user, :coinspayment_transactions, :referral_records]})}
        return
      else
        render json: @deposit.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # DELETE /deposits/1
  def destroy
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @deposit.destroy
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deposit
      @deposit = Deposit.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def deposit_params
      params.require(:deposit).permit(:user_id, :crx_amount, :amount_usd, :amount_eth)
    end
end
