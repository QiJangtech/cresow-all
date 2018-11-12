class ReferralRecord < ApplicationRecord
	belongs_to :user
	belongs_to :deposit

	def self.bonus_calculations(amount_eth, amount_usd, user_level)
		#PREPARE INITIAL OBJECT
		bonus_result = Hash.new
		bonus_result["bonus"] = 0
		bonus_result["percentage"] = 0
		bonus_result["package"] = ""

		#GET REFERRAL PACKAGE
		@Referral = Referral.where("min_amount <= ?", amount_usd)
										    .where("max_amount >= ?", amount_usd)
										    .first

		#IGNORE UNRECORDED PROFIT LEVEL
		unless @Referral.referral_profits.where("referral_profits.profit_level = ?", user_level).blank?
			#GET REFERRAL BONUS/PROFIT BASED ON USER LEVEL
			@ReferralProfit = @Referral.referral_profits.where("referral_profits.profit_level = ?", user_level).first

			#UPDATE INITIAL OBJECT TO RETURN
			bonus_result["package"] = @Referral.referral_package.name	
			bonus_result["bonus"] = "%.20f" % (@ReferralProfit.profit_percentage.to_f * amount_eth)
			bonus_result["percentage"] = @ReferralProfit.profit_percentage.to_f
		end

		return bonus_result
	end
end
