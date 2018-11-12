class ReferralPackagesController < ApplicationController
  respond_to :json
  before_action do
    doorkeeper_authorize! :user
  end
  before_action :set_referral_package, only: [:show, :update, :destroy]

  # GET /referral_packages
  def index
    @referral_packages = ReferralPackage.all

    render json: @referral_packages
  end

  # GET /referral_packages/1
  def show
    render json: @referral_package
  end

  # POST /referral_packages
  def create
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @referral_package = ReferralPackage.new(referral_package_params)

      if @referral_package.save
        render json: @referral_package, status: :created, location: @referral_package
      else
        render json: @referral_package.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # PATCH/PUT /referral_packages/1
  def update
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      if @referral_package.update(referral_package_params)
        render json: @referral_package
      else
        render json: @referral_package.errors, status: :unprocessable_entity
      end
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  # DELETE /referral_packages/1
  def destroy
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @referral_package.destroy
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_referral_package
      @referral_package = ReferralPackage.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def referral_package_params
      params.require(:referral_package).permit(:name)
    end
end
