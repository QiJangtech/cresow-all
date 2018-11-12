class CreateReferralPackages < ActiveRecord::Migration[5.2]
  def change
    create_table :referral_packages do |t|
    	t.string		:name
      t.timestamps
    end
  end
end
