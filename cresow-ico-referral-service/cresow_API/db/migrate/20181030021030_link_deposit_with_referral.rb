class LinkDepositWithReferral < ActiveRecord::Migration[5.2]
  def change
  	add_column :referral_records, :deposit_id, :integer
  end
end
