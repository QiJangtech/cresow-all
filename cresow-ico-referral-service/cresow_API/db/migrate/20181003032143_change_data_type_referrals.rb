class ChangeDataTypeReferrals < ActiveRecord::Migration[5.2]
  def change
  	change_column :referral_records, :bonus, :string
  	change_column :referral_records, :percentage, :string
  	change_column :referral_records, :amount_usd, :string
  	change_column :referral_records, :amount_eth, :string
  end
end
