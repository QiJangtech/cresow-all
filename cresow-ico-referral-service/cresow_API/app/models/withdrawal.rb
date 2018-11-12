class Withdrawal < ApplicationRecord
	belongs_to :user
	belongs_to :withdrawal_status
end
