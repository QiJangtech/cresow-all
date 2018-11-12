class CreateDeposits < ActiveRecord::Migration[5.2]
  def change
    create_table :deposits do |t|
    	t.integer 	:user_id
    	t.string		:crx_amount
    	t.string 		:amount_usd
    	t.string 		:amount_eth
      t.timestamps
    end
  end
end
