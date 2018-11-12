class DashboardsController < ApplicationController
	respond_to :json
  before_action except: [:registered_users] do
    doorkeeper_authorize! :user
  end

  def registered_users
    @users = User.all

    render :json => {:status => true, :result => @users.count}
    return
  end

  def deposits_and_bonus
  	@total_eth = ""
  	@total_usd = ""
  	@users = User.all
  	@users.each do |user|
  		user_deposits = user.deposits
  		user_deposits.each do |deposit|
  			eth_amount = deposit.coinspayment_transactions.order(id: :desc).first.amount_converted_currency
  			usd_amount = deposit.coinspayment_transactions.order(id: :desc).first.amount_original_currency
  			@total_eth = "%.20f" % (@total_eth.to_f + eth_amount.to_f)
  			@total_usd = "%.2f" % (@total_usd.to_f + usd_amount.to_f)
  		end
  	end

  	render :json => {:status => true, :total_usd => @total_usd, :total_eth => @total_eth, :number_of_deposits_made => Deposit.all.count}
  	return
  end
end
