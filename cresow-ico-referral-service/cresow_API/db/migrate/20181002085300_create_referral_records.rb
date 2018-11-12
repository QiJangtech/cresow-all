class CreateReferralRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :referral_records do |t|
    	t.integer :user_id	
    	t.integer :level
    	t.float 	:bonus
    	t.float 	:percentage
    	t.string 	:referral_id
      t.timestamps
    end
  end
end
