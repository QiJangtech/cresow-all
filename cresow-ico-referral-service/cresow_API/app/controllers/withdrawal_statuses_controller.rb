class WithdrawalStatusesController < ApplicationController
  respond_to :json
  before_action do
    doorkeeper_authorize! :user
  end
  before_action :set_withdrawal_status, only: [:show, :update, :destroy]

  # GET /withdrawal_statuses
  def index
    @withdrawal_statuses = WithdrawalStatus.all

    render json: @withdrawal_statuses
  end

  # GET /withdrawal_statuses/1
  def show
    render json: @withdrawal_status
  end

  # POST /withdrawal_statuses
  def create
    @withdrawal_status = WithdrawalStatus.new(withdrawal_status_params)

    if @withdrawal_status.save
      render json: @withdrawal_status, status: :created, location: @withdrawal_status
    else
      render json: @withdrawal_status.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /withdrawal_statuses/1
  def update
    if @withdrawal_status.update(withdrawal_status_params)
      render json: @withdrawal_status
    else
      render json: @withdrawal_status.errors, status: :unprocessable_entity
    end
  end

  # DELETE /withdrawal_statuses/1
  def destroy
    @withdrawal_status.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_withdrawal_status
      @withdrawal_status = WithdrawalStatus.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def withdrawal_status_params
      params.require(:withdrawal_status).permit(:name)
    end
end
