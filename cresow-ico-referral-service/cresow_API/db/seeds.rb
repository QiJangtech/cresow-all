# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#CREATE CRESOW ADMIN ACCOUNT
unless User.exists?(:email => ENV["CRESOW_ADMIN_EMAIL"])
	o = [('a'..'z'), (1..10)].map(&:to_a).flatten
	token = (0...10).map { o[rand(o.length)] }.join

	@User = User.new
	@User.first_name = "Cresow"
	@User.last_name = "Admin"
	@User.address = ""
	@User.postal_code = ""
	@User.contact_no = ""
	@User.email = ENV["CRESOW_ADMIN_EMAIL"]
	@User.referral_id = token
	@User.parent_id = nil
	@User.parent_root_id = nil
	@User.level = 0
	@User.password = "123456"
	@User.password_confirmation = "123456"
	@User.save!
end

# WithdrawalStatus.create([{name: "Pending"},
# 						             {name: "Completed"},
# 						             {name: "Rejected"}])

# ReferralPackage.create([{name: "BRONZE"},
# 												{name: "SILVER"},
# 												{name: "GOLD"},
# 											  {name: "PLATINUM"}
# 											])

# Referral.create([{referral_package_id: 1, min_amount: "500", max_amount: "2499"},
# 								 {referral_package_id: 2, min_amount: "2500", max_amount: "9999"},
# 								 {referral_package_id: 3, min_amount: "10000", max_amount: "24999"},
# 								 {referral_package_id: 4, min_amount: "25000", max_amount: "50000"}
# 								])

# #BRONZE PROFIT
# ReferralProfit.create([{profit_percentage: "0.05", profit_level: 1, referral_id: 1},
# 											 {profit_percentage: "0.03", profit_level: 2, referral_id: 1},
# 											 {profit_percentage: "0.02", profit_level: 3, referral_id: 1}
# 											])

# #SILVER PROFIT
# ReferralProfit.create([{profit_percentage: "0.07", profit_level: 1, referral_id: 2},
# 											 {profit_percentage: "0.03", profit_level: 2, referral_id: 2},
# 											 {profit_percentage: "0.02", profit_level: 3, referral_id: 2}
# 											])

# #GOLD PROFIT
# ReferralProfit.create([{profit_percentage: "0.09", profit_level: 1, referral_id: 3},
# 											 {profit_percentage: "0.03", profit_level: 2, referral_id: 3},
# 											 {profit_percentage: "0.02", profit_level: 3, referral_id: 3}
# 											])

# #PLATINUM PROFIT
# ReferralProfit.create([{profit_percentage: "0.12", profit_level: 1, referral_id: 4},
# 											 {profit_percentage: "0.03", profit_level: 2, referral_id: 4},
# 											 {profit_percentage: "0.02", profit_level: 3, referral_id: 4}
# 											])