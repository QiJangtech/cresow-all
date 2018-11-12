class CreateReferralProfits < ActiveRecord::Migration[5.2]
  def change
    create_table :referral_profits do |t|
    	t.integer		:referral_package_id
    	t.string 		:profit_percentage
    	t.integer		:profit_level
      t.timestamps
    end
  end
end
