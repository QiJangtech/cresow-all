class WithdrawalsController < ApplicationController
  respond_to :json
  before_action do
    doorkeeper_authorize! :user
  end
  before_action :set_withdrawal, only: [:show, :update, :destroy]

  # GET /withdrawals
  def index
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @withdrawals = Withdrawal.all

      render :json => {:status => true, :result => @withdrawals.as_json({:include => [{:user => {:include => :wallet}}, :withdrawal_status]})}
      return
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # GET /withdrawals/1
  def show
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      render :json => {:status => true, :result => @withdrawal.as_json({:include => [{:user => {:include => :wallet}}, :withdrawal_status]})}
      return
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # POST /withdrawals
  def create
    @withdrawal = Withdrawal.new(withdrawal_params)
    if @withdrawal.save
      #CALCULATE TOTAL DEPOSITS
      @user = @withdrawal.user
      #CHECK IF THIS USER GOT ANY WALLET
      if @user.wallet.blank?
        @withdrawal.destroy
        render :json => {:status => false, :error => "User didn't got any wallet for withdrawal!"}, status: 400
        return
      end
      #FETCH TOTAL ETH BONUS
      @total_eth_bonus = ""
      @user.referral_records.each do |referral|
        bonus_eth_amount = referral.bonus
        @total_eth_bonus = "%.20f" % (@total_eth_bonus.to_f + bonus_eth_amount.to_f)
      end
      #VALIDATE WITHDRAWALS
      if @withdrawal.amount_eth > @total_eth_bonus
        @withdrawal.destroy
        render :json => {:status => false, :error => "withdrawal exceeds your bonus amount received! Bonus amount received is #{@total_eth_bonus}"}, status: 400
        return
      end

      #SET WITHDRAWAL STATUS TO PENDING
      @withdrawal.withdrawal_status_id = 1
      @withdrawal.save!

      render :json => {:status => true, :result => @withdrawal.as_json({:include => [{:user => {:include => :wallet}}, :withdrawal_status]})}
      return
    else
      render json: @withdrawal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /withdrawals/1
  def update
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      if @withdrawal.update(withdrawal_params)
        render :json => {:status => true, :result => @withdrawal.as_json({:include => [{:user => {:include => :wallet}}, :withdrawal_status]})}
        return
      else
        render json: @withdrawal.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # DELETE /withdrawals/1
  def destroy
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      if @withdrawal.destroy
      	render :json => {:status => true, :result => "withdrawal destroyed!"}
      	return
      else
      	render :json => {:status => false, :error => @withdrawal.errors}, status: 400
      	return
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_withdrawal
      @withdrawal = Withdrawal.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def withdrawal_params
      params.require(:withdrawal).permit(:amount_eth, :withdrawal_status_id, :user_id)
    end
end
