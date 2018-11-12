class WalletsController < ApplicationController
  respond_to :json
  before_action do
    doorkeeper_authorize! :user
  end

  # GET /wallets
  def index
    @wallets = Wallet.all
                     .where("user_id = ?", doorkeeper_token.resource_owner_id)

    render json: @wallets
  end

  # GET /wallets/1
  def show
    @wallet = Wallet.where("user_id = ?", doorkeeper_token.resource_owner_id)
                    .where("id = ?", params[:id])
                    .first

    render json: @wallet
  end

  # POST /wallets
  def create
    @adm = User.find(doorkeeper_token.resource_owner_id)

    @wallet = Wallet.new
    @wallet.user_id = doorkeeper_token.resource_owner_id
    @wallet.eth_address = params["eth_address"]

    unless @adm.wallet.blank?
      render :json => {:status => false, :error => "You can only have 1 wallet!"}
      return
    end

    if @wallet.save
      render json: @wallet, status: :created, location: @wallet
    else
      render json: @wallet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /wallets/1
  def update
    @wallet = Wallet.where("user_id = ?", doorkeeper_token.resource_owner_id)
                    .where("id = ?", params[:id])
                    .first
    @wallet.user_id = doorkeeper_token.resource_owner_id
    @wallet.eth_address = params["eth_address"]

    if @wallet.save
      render json: @wallet
    else
      render json: @wallet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /wallets/1
  def destroy
    @wallet = Wallet.where("user_id = ?", doorkeeper_token.resource_owner_id)
                    .where("id = ?", params[:id])
                    .first
    @wallet.destroy

    render :json => {:status => true, :result => "Deleted!"}
    return
  end
end
