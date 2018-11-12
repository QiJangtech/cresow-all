class Referral < ApplicationRecord
	belongs_to :referral_package
	has_many :referral_profits
end
