class ReferralProfitsController < ApplicationController
  respond_to :json
  before_action do
    doorkeeper_authorize! :user
  end
  before_action :set_referral_profit, only: [:show, :update, :destroy]

  # GET /referral_profits
  def index
    @referral_profits = ReferralProfit.all

    render json: @referral_profits
  end

  # GET /referral_profits/1
  def show
    render json: @referral_profit
  end

  # POST /referral_profits
  def create
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @referral_profit = ReferralProfit.new(referral_profit_params)

      if @referral_profit.save
        render json: @referral_profit, status: :created, location: @referral_profit
      else
        render json: @referral_profit.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # PATCH/PUT /referral_profits/1
  def update
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      if @referral_profit.update(referral_profit_params)
        render json: @referral_profit
      else
        render json: @referral_profit.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # DELETE /referral_profits/1
  def destroy
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @referral_profit.destroy
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_referral_profit
      @referral_profit = ReferralProfit.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def referral_profit_params
      params.require(:referral_profit).permit(:profit_percentage, :profit_level, :referral_id)
    end
end
