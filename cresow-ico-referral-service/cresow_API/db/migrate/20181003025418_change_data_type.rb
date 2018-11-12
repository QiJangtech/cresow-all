class ChangeDataType < ActiveRecord::Migration[5.2]
  def change
  	change_column :referral_records, :bonus, :decimal
  	change_column :referral_records, :percentage, :decimal
  	change_column :referral_records, :amount_usd, :decimal
  	change_column :referral_records, :amount_eth, :decimal
  end
end
