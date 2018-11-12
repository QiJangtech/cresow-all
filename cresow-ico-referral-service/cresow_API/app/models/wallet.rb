class Wallet < ApplicationRecord
	validates :eth_address, :uniqueness => {:scope => [:user_id], :message => "Wallet already registered!"}

	belongs_to :user
end
