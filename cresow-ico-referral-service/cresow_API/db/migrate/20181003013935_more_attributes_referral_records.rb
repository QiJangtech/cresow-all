class MoreAttributesReferralRecords < ActiveRecord::Migration[5.2]
  def change
  	add_column :referral_records, :package, :string
  	add_column :referral_records, :amount_usd, :float
  	add_column :referral_records, :amount_eth, :float
  end
end
