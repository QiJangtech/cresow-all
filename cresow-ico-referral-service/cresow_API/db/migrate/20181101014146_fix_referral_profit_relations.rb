class FixReferralProfitRelations < ActiveRecord::Migration[5.2]
  def change
  	remove_column :referrals, :referral_profit_id
  	remove_column :referral_profits, :referral_package_id

  	add_column :referral_profits, :referral_id, :integer
  end
end
