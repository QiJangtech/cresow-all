class CreateCoinspaymentTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :coinspayment_transactions do |t|
    	t.integer 		:deposit_id
    	t.string 			:amount
    	t.string 			:transaction_id
    	t.string 			:send_to_address
    	t.float 			:timeout
    	t.string 			:status_url
    	t.string			:qrcode_url
    	t.string			:amount_original_currency
    	t.string			:amount_converted_currency
    	t.string			:original_currency 
    	t.string			:converted_currency 
    	t.string 			:transaction_fee
    	t.integer 		:status_code
    	t.string 			:status_string
    	t.string 			:received_amount
    	t.string 			:received_confirms
    end
  end
end
