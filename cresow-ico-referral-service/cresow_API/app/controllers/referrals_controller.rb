class ReferralsController < ApplicationController
  respond_to :json
  before_action do
    doorkeeper_authorize! :user
  end
  before_action :set_referral, only: [:show, :update, :destroy]

  # GET /referrals
  def index
    @referrals = Referral.all

    render json: @referrals.as_json({:include => [:referral_package, :referral_profits]})
  end

  # GET /referrals/1
  def show
    render json: @referral.as_json({:include => [:referral_package, :referral_profits]})
  end

  # POST /referrals
  def create
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @referral = Referral.new(referral_params)

      if @referral.save
        render json: @referral.as_json({:include => [:referral_package, :referral_profits]}), status: :created, location: @referral
      else
        render json: @referral.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # PATCH/PUT /referrals/1
  def update
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      if @referral.update(referral_params)
        render json: @referral.as_json({:include => [:referral_package, :referral_profits]})
      else
        render json: @referral.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # DELETE /referrals/1
  def destroy
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @referral.destroy
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_referral
      @referral = Referral.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def referral_params
      params.require(:referral).permit(:referral_package_id, :min_amount, :max_amount)
    end
end
