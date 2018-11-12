class CreateWithdrawals < ActiveRecord::Migration[5.2]
  def change
    create_table :withdrawals do |t|
    	t.string 		:amount_eth
    	t.integer 	:withdrawal_status_id
    	t.integer 	:user_id

      t.timestamps
    end
  end
end
