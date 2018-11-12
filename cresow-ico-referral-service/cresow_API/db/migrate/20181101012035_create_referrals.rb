class CreateReferrals < ActiveRecord::Migration[5.2]
  def change
    create_table :referrals do |t|
    	t.integer		:referral_package_id
    	t.integer		:referral_profit_id
    	t.string 		:min_amount
    	t.string		:max_amount
      t.timestamps
    end
  end
end
