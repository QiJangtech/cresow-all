class ReferralRecordsController < ApplicationController
  respond_to :json
  before_action except: [:create] do
    doorkeeper_authorize! :user
  end

  def index
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @ReferralRecords = ReferralRecord.all
    else
      @ReferralRecords = ReferralRecord.where("user_id = ?", @adm.id)
    end

    @page = 0
    @take = 999999
    @skip = @take.to_i * @page.to_i 

    if (params.has_key?("page") && params.has_key?("take")) && (!params[:page].blank? && !params[:take].blank?)
        @page = (params[:page].to_i - 1) < 0 ? 0 : (params[:page].to_i - 1)
        @take = params[:take]
        @skip = @take.to_i * @page.to_i 
    end

    if params.has_key?("user_id") && !params[:user_id].blank?
      @ReferralRecords = @ReferralRecords.where("user_id IN (?)", params[:user_id].split(","))
    end

    render :json => {:status => true, :result => @ReferralRecords.offset(@skip).limit(@take).as_json({:include => [:user, :deposit]})}
    return
  end

  def new
  end

  def create
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      # ["id", "user_id", "level", "bonus", "percentage", "referral_id", "created_at", "updated_at"]
      @record_ids = Array.new
      @ReferralRecord = ReferralRecord.new
      @ReferralRecord.user_id = params[:user_id]
      @ReferralRecord.amount_usd = params[:amount_usd]
      @ReferralRecord.amount_eth = params[:amount_eth]

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
          calc = ReferralRecord.bonus_calculations(params[:amount_eth].to_f, params[:amount_usd].to_f, @ReferralRecord.user.level)
          @ReferralRecord.bonus = calc["bonus"]
          @ReferralRecord.percentage = calc["percentage"]
          @ReferralRecord.package = calc["package"]
          @ReferralRecord.save!

          unless @ReferralRecord.user.upline.blank?
            #SET REFERRAL BONUS ALSO TO UPLINES
            reference = User.find_by_referral_id(@ReferralRecord.user.upline.referral_id)
            @ReferralRecord = ReferralRecord.new
            @ReferralRecord.user_id = reference.id
            @ReferralRecord.amount_usd = params[:amount_usd]
            @ReferralRecord.amount_eth = params[:amount_eth]
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
            calc = ReferralRecord.bonus_calculations(params[:amount_eth].to_f, params[:amount_usd].to_f, reference.level)
            @ReferralRecord.bonus = calc["bonus"]
            @ReferralRecord.percentage = calc["percentage"]
            @ReferralRecord.package = calc["package"]
            if reference.level != 0
              @ReferralRecord.save!
              @record_ids.push(@ReferralRecord.id)
            end

            #SET REFERRAL BONUS ALSO TO OTHER UPLINES
            until reference.parent_id.blank? do
              reference = User.find(reference.parent_id)
              @ReferralRecord = ReferralRecord.new
              @ReferralRecord.user_id = reference.id
              @ReferralRecord.amount_usd = params[:amount_usd]
              @ReferralRecord.amount_eth = params[:amount_eth]
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
              calc = ReferralRecord.bonus_calculations(params[:amount_eth].to_f, params[:amount_usd].to_f, reference.level)
              @ReferralRecord.bonus = calc["bonus"]
              @ReferralRecord.percentage = calc["percentage"]
              @ReferralRecord.package = calc["package"]
              if reference.level != 0
                @ReferralRecord.save!
                @record_ids.push(@ReferralRecord.id)
              end
            end
          end
        end

        render :json => {:status => true, :result => ReferralRecord.where("id IN (?)", @record_ids)}
        return
      else
        render :json => {:status => false, :result => @ReferralRecord.errors}, status: 400
        return
      end 
    else
      render :json => {:status => false, :error => "Access Granted Only to Cresow Admin"}, status: 401
      return
    end
  end

  def show
    @adm = User.find(doorkeeper_token.resource_owner_id)
    if @adm.email == ENV["CRESOW_ADMIN_EMAIL"]
      @ReferralRecords = ReferralRecord.find(params[:id])
    else
      @ReferralRecords = ReferralRecord.where("user_id = ?", @adm.id)
                                       .where("id = ?", params[:id])
                                       .first
    end

    render :json => {:status => true, :result => @ReferralRecords.as_json({:include => [:user, :deposit]})}
    return
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
