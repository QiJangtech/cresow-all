class ReferralIdToUsers < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :referral_id, :string
  	add_column :users, :level, :integer
  end
end
