class UsersController < ApplicationController
  respond_to :json
  before_action except: [:create, :logout] do
    doorkeeper_authorize! :user
  end

  def logout
  	if doorkeeper_token
	    if doorkeeper_token.scopes.to_s == "user"
	      @user = User.find(doorkeeper_token.resource_owner_id)

	      sql = "DELETE FROM oauth_access_tokens WHERE oauth_access_tokens.resource_owner_id = '#{doorkeeper_token.resource_owner_id}'"
	      records_array = ActiveRecord::Base.connection.execute(sql)

	      render :json => {:status => true, :result => "Session Destroyed."}
	      return
	    end
	  end
  end

  def index
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @page = 0
      @take = 999999
      @skip = @take.to_i * @page.to_i 

      if (params.has_key?("page") && params.has_key?("take")) && (!params[:page].blank? && !params[:take].blank?)
          @page = (params[:page].to_i - 1) < 0 ? 0 : (params[:page].to_i - 1)
          @take = params[:take]
          @skip = @take.to_i * @page.to_i 
      end
    
      @users = User.all

      render :json => {:status => true, :result => @users.offset(@skip).limit(@take).as_json({:include => [:parent, :upline, :downlines]})}
      return
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  def profile
    @user = User.find(doorkeeper_token.resource_owner_id)

    #FETCH TOTAL ETH & USD DEPOSIT
    @total_eth_deposit = ""
    @total_usd_deposit = ""
    @user.deposits.each do |deposit|
      eth_amount = deposit.coinspayment_transactions.order(id: :desc).first.amount_converted_currency
      usd_amount = deposit.coinspayment_transactions.order(id: :desc).first.amount_original_currency
      @total_eth_deposit = "%.20f" % (@total_eth_deposit.to_f + eth_amount.to_f)
      @total_usd_deposit = "%.2f" % (@total_usd_deposit.to_f + usd_amount.to_f) 
    end
    #FETCH TOTAL ETH BONUS
    @total_eth_bonus = ""
    @user.referral_records.each do |referral|
      bonus_eth_amount = referral.bonus
      @total_eth_bonus = "%.20f" % (@total_eth_bonus.to_f + bonus_eth_amount.to_f)
    end

    deposit_bonus = Hash.new
    deposit_bonus["total_eth_deposit"] = @total_eth_deposit
    deposit_bonus["total_usd_deposit"] = @total_usd_deposit
    deposit_bonus["bonus_eth_amount"]  = @total_eth_bonus

    render :json => {:status => true, :deposits_and_bonus => deposit_bonus, 
                                      :result => @user.as_json({:include => [:parent, 
                                                                             :upline, 
                                                                             :downlines,
                                                                             :wallet,
                                                                             {:deposits => {:include => [:referral_records,
                                                                                                         :coinspayment_transactions]}}]})}
    return
  end

  def new
  end

  def create
    o = [('a'..'z'), (1..10)].map(&:to_a).flatten
    token = (0...10).map { o[rand(o.length)] }.join

    @User = User.new
    @User.first_name = params[:first_name]
    @User.last_name = params[:last_name]
    @User.address = params[:address]
    @User.postal_code = params[:postal_code]
    @User.contact_no = params[:contact_no]
    @User.email = params[:email]

    if params.has_key?("referral_id") && !params[:referral_id].blank?
      if User.exists?(:referral_id => params[:referral_id])
        #MUST FIND THE ROOT
        references = User.get_referrals(params[:referral_id])
        @User.referral_id = token
        @User.parent_id = references.max
        @User.parent_root_id = references.min
        @User.level = User.find_by_referral_id(params[:referral_id]).level + 1
      else
        render :json => {:status => false, :result => "referral_id not exists!"}, status: 404
        return
      end
    else
      @User.referral_id = token
      @User.parent_id = User.find_by_email(ENV["CRESOW_ADMIN_EMAIL"]).id
      @User.parent_root_id = @User.parent_id 
      @User.level = 1
    end

    if params.has_key?("is_default_password") && (params[:is_default_password] == true || params[:is_default_password] == "true")
      @User.password = "123456"
      @User.password_confirmation = "123456"
    else
      @User.password = params[:password]
      @User.password_confirmation = params[:password]
    end

    if @User.save
      #CREATE WALLET FOR USER
      if params.has_key?("wallet") && !params[:wallet].blank?
        wallet_obj = params[:wallet]
        #CREATE NEW WALLET
        @wallet = Wallet.new
        @wallet.user_id = @User.id
        @wallet.eth_address = wallet_obj["eth_address"]

        if @wallet.save
          puts "CREATED WALLET FOR #{@User.email}"
        else
          #DESTROY PREVIOUS CREATED RECORDS
          @User.wallet.destroy
          @User.destroy

          render :json => {:status => false, :result => @wallet.errors}, status: 400
          return
        end
      end

      render :json => {:status => true, :result => @User.as_json({:include => [:parent, :upline, :downlines, :wallet]})}
      return
    else
      render :json => {:status => false, :result => @User.errors}, status: 400
      return
    end
  end

  def show
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @user = User.find(params[:id])

      #FETCH TOTAL ETH & USD DEPOSIT
      @total_eth_deposit = ""
      @total_usd_deposit = ""
      @user.deposits.each do |deposit|
        eth_amount = deposit.coinspayment_transactions.order(id: :desc).first.amount_converted_currency
        usd_amount = deposit.coinspayment_transactions.order(id: :desc).first.amount_original_currency
        @total_eth_deposit = "%.20f" % (@total_eth_deposit.to_f + eth_amount.to_f)
        @total_usd_deposit = "%.2f" % (@total_usd_deposit.to_f + usd_amount.to_f) 
      end
      #FETCH TOTAL ETH BONUS
      @total_eth_bonus = ""
      @user.referral_records.each do |referral|
        bonus_eth_amount = referral.bonus
        @total_eth_bonus = "%.20f" % (@total_eth_bonus.to_f + bonus_eth_amount.to_f)
      end

      deposit_bonus = Hash.new
      deposit_bonus["total_eth_deposit"] = @total_eth_deposit
      deposit_bonus["total_usd_deposit"] = @total_usd_deposit
      deposit_bonus["bonus_eth_amount"]  = @total_eth_bonus

      render :json => {:status => true, :deposits_and_bonus => deposit_bonus,
                                        :result => @user.as_json({:include => [:parent, 
                                                                               :upline, 
                                                                               :downlines,
                                                                               {:deposits => {:include => [:referral_records,
                                                                                                           :coinspayment_transactions]}}]})}
      return
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  def edit
  end

  def update
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      o = [('a'..'z'), (1..10)].map(&:to_a).flatten
      token = (0...10).map { o[rand(o.length)] }.join

      @User = User.find(params[:id])
      @User.first_name = params[:first_name]
      @User.last_name = params[:last_name]
      @User.address = params[:address]
      @User.postal_code = params[:postal_code]
      @User.contact_no = params[:contact_no]
      # @User.email = params[:email]
      @User.disabled = false
      if params.has_key?("disabled") && (params[:disabled] == true || params[:disabled] == "true")
        @User.disabled = true
      end

      if params.has_key?("referral_id") && !params[:referral_id].blank?
        if User.exists?(:referral_id => params[:referral_id])
          #MUST FIND THE ROOT
          references = User.get_referrals(params[:referral_id])
          @User.referral_id = token
          @User.parent_id = references.max
          @User.parent_root_id = references.min
          @User.level = User.find_by_referral_id(@User.parent_id).level + 1
        else
          render :json => {:status => false, :result => "referral_id not exists!"}, status: 404
          return
        end
      # else
      #   @User.referral_id = token
      #   @User.parent_id = User.find_by_email(ENV["CRESOW_ADMIN_EMAIL"]).id
      #   @User.parent_root_id = @User.parent_id
      #   @User.level = 1
      end

      if params.has_key?("is_default_password") && (params[:is_default_password] == true || params[:is_default_password] == "true")
        @User.password = "123456"
        @User.password_confirmation = "123456"
      else
        @User.password = params[:password]
        @User.password_confirmation = params[:password]
      end

      if @User.save
        #CREATE WALLET FOR USER
        if params.has_key?("wallet") && !params[:wallet].blank?
          wallet_obj = params[:wallet]
          #REMOVE OLD REPLACE WITH NEW ONE
          @User.wallet.destroy
          #CREATE NEW WALLET
          @wallet = Wallet.new
          @wallet.user_id = @User.id
          @wallet.eth_address = wallet_obj["eth_address"]

          if @wallet.save
            puts "CREATED WALLET FOR #{@User.email}"
          else
            #DESTROY PREVIOUS CREATED RECORDS
            @User.wallet.destroy
            @User.destroy

            render :json => {:status => false, :result => @wallet.errors}, status: 400
            return
          end
        end

        render :json => {:status => true, :result => @User.reload.as_json({:include => [:parent, :upline, :downlines, :wallet]})}
        return
      else
        render :json => {:status => false, :result => @User.errors}, status: 400
        return
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  def update_profile
    o = [('a'..'z'), (1..10)].map(&:to_a).flatten
    token = (0...10).map { o[rand(o.length)] }.join

    @User = User.find(doorkeeper_token.resource_owner_id)
    @User.first_name = params[:first_name]
    @User.last_name = params[:last_name]
    @User.address = params[:address]
    @User.postal_code = params[:postal_code]
    @User.contact_no = params[:contact_no]
    # @User.email = params[:email]

    if params.has_key?("referral_id") && !params[:referral_id].blank?
      if User.exists?(:referral_id => params[:referral_id])
        #MUST FIND THE ROOT
        references = User.get_referrals(params[:referral_id])
        @User.referral_id = token
        @User.parent_id = references.max
        @User.parent_root_id = references.min
        @User.level = User.find_by_referral_id(@User.parent_id).level + 1
      else
        render :json => {:status => false, :result => "referral_id not exists!"}, status: 404
        return
      end
    # else
    #   @User.referral_id = token
    #   @User.parent_id = User.find_by_email(ENV["CRESOW_ADMIN_EMAIL"]).id
    #   @User.parent_root_id = @User.parent_id
    #   @User.level = 1
    end

    if params.has_key?("is_default_password") && (params[:is_default_password] == true || params[:is_default_password] == "true")
      @User.password = "123456"
      @User.password_confirmation = "123456"
    else
      @User.password = params[:password]
      @User.password_confirmation = params[:password]
    end

    if @User.save
      #CREATE WALLET FOR USER
      if params.has_key?("wallet") && !params[:wallet].blank?
        wallet_obj = params[:wallet]
        #REMOVE OLD REPLACE WITH NEW ONE
        @User.wallet.destroy
        #CREATE NEW WALLET
        @wallet = Wallet.new
        @wallet.user_id = @User.id
        @wallet.eth_address = wallet_obj["eth_address"]

        if @wallet.save
          puts "CREATED WALLET FOR #{@User.email}"
        else
          #DESTROY PREVIOUS CREATED RECORDS
          @User.wallet.destroy
          @User.destroy

          render :json => {:status => false, :result => @wallet.errors}, status: 400
          return
        end
      end

      render :json => {:status => true, :result => @User.reload.as_json({:include => [:parent, :upline, :downlines, :wallet]})}
      return
    else
      render :json => {:status => false, :result => @User.errors}, status: 400
      return
    end
  end

  def destroy
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @users = User.find(params[:id])

      if @users.destroy
        render :json => {:status => true, :result => "User Deleted"}
        return
      else
        render :json => {:status => false, :result => @users.errors}, status: 400
        return
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end
end
