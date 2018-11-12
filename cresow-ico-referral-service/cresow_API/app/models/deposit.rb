class Deposit < ApplicationRecord
	belongs_to :user
	has_many   :coinspayment_transactions
	has_many 	 :referral_records

	def self.create_referrals(user_id, amount_usd, amount_eth, deposit_id=nil)
		# REFERRAL ATTRIBUTES
		# ["id", "user_id", "level", "bonus", "percentage", "referral_id", "created_at", "updated_at", "deposit_id"]
    @record_ids = Array.new
    @ReferralRecord = ReferralRecord.new
    @ReferralRecord.user_id = user_id
    @ReferralRecord.amount_usd = amount_usd
    @ReferralRecord.amount_eth = amount_eth

    if @ReferralRecord.save
      @record_ids.push(@ReferralRecord.id)
      
      unless @ReferralRecord.user.blank?
        if @ReferralRecord.user.upline.blank?
          @ReferralRecord.referral_id = @ReferralRecord.user.referral_id
        else
          if @ReferralRecord.user.upline.referral_id.blank?
            @ReferralRecord.referral_id = @ReferralRecord.user.referral_id
          else
            @ReferralRecord.referral_id = @ReferralRecord.user.upline.referral_id
          end
        end
        @ReferralRecord.level = @ReferralRecord.user.level
        #SUBMIT RECORD TO CLASS METHOD FOR BONUS/PROFIT CALCULATIONS
        calc = ReferralRecord.bonus_calculations(amount_eth.to_f, amount_usd.to_f, @ReferralRecord.user.level)
        #ASSIGN CALCULATED BONUS/PROFIT TO ATTRIBUTES FROM CLASS METHOD RETURN OBJECT 
        @ReferralRecord.bonus = calc["bonus"]
        @ReferralRecord.percentage = calc["percentage"]
        @ReferralRecord.package = calc["package"]
        @ReferralRecord.deposit_id = deposit_id
        @ReferralRecord.save!

        unless @ReferralRecord.user.upline.blank?
          #SET REFERRAL BONUS ALSO TO UPLINES
          reference = User.find_by_referral_id(@ReferralRecord.user.upline.referral_id)
          @ReferralRecord = ReferralRecord.new
          @ReferralRecord.user_id = reference.id
          @ReferralRecord.amount_usd = amount_usd
          @ReferralRecord.amount_eth = amount_eth
          if reference.upline.blank?
            @ReferralRecord.referral_id = reference.referral_id
          else
            if reference.upline.referral_id.blank?
              @ReferralRecord.referral_id = reference.referral_id
            else
              @ReferralRecord.referral_id = reference.upline.referral_id
            end
          end
          @ReferralRecord.level = reference.level
          #SUBMIT RECORD TO CLASS METHOD FOR BONUS/PROFIT CALCULATIONS
          calc = ReferralRecord.bonus_calculations(amount_eth.to_f, amount_usd.to_f, reference.level)
          #ASSIGN CALCULATED BONUS/PROFIT TO ATTRIBUTES FROM CLASS METHOD RETURN OBJECT 
          @ReferralRecord.bonus = calc["bonus"]
          @ReferralRecord.percentage = calc["percentage"]
          @ReferralRecord.package = calc["package"]
          @ReferralRecord.deposit_id = deposit_id
          if reference.level != 0
            @ReferralRecord.save!
            @record_ids.push(@ReferralRecord.id)
          end

          #SET REFERRAL BONUS ALSO TO OTHER UPLINES
          until reference.parent_id.blank? do
            reference = User.find(reference.parent_id)
            @ReferralRecord = ReferralRecord.new
            @ReferralRecord.user_id = reference.id
            @ReferralRecord.amount_usd = amount_usd
            @ReferralRecord.amount_eth = amount_eth
            if reference.upline.blank?
              @ReferralRecord.referral_id = reference.referral_id
            else
              if reference.upline.referral_id.blank?
                @ReferralRecord.referral_id = reference.referral_id
              else
                @ReferralRecord.referral_id = reference.upline.referral_id
              end
            end
            @ReferralRecord.level = reference.level
            #SUBMIT RECORD TO CLASS METHOD FOR BONUS/PROFIT CALCULATIONS
            calc = ReferralRecord.bonus_calculations(amount_eth.to_f, amount_usd.to_f, reference.level)
            #ASSIGN CALCULATED BONUS/PROFIT TO ATTRIBUTES FROM CLASS METHOD RETURN OBJECT 
            @ReferralRecord.bonus = calc["bonus"]
            @ReferralRecord.percentage = calc["percentage"]
            @ReferralRecord.package = calc["package"]
            @ReferralRecord.deposit_id = deposit_id
            if reference.level != 0
              @ReferralRecord.save!
              @record_ids.push(@ReferralRecord.id)
            end
          end
        end
      end

      Rails.logger.info ReferralRecord.where("id IN (?)", @record_ids).as_json
      return ReferralRecord.where("id IN (?)", @record_ids)
    else
      return {}
    end 
	end
end
