class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable

  attr_accessor :is_user_updating_profile
  attr_accessor :is_user_updating_email
  attr_accessor :is_user_updating_password

  before_save { self.email = email.downcase if email.present? }
  before_update { self.email = email.downcase if email.present? }

  validates :email, uniqueness: {message: "Username is already taken. Try another."}
  validates :password, presence: true, confirmation: true, unless: [:is_user_updating_profile, :is_user_updating_email]
  validates :password_confirmation, presence: true, unless: [:is_user_updating_profile, :is_user_updating_email]

  has_many   :downlines, class_name: "User", foreign_key: "parent_id"
  belongs_to :upline, class_name: "User", foreign_key: "parent_id"
  belongs_to :parent, class_name: "User", foreign_key: "parent_root_id"
  has_many   :referral_records
  has_one    :wallet
  has_many   :deposits
  has_many   :withdrawals

  def self.get_referrals(referral_id)
  	users = Array.new
  	#FIND FROM BOTTOM TO TOP
  	reference = User.find_by_referral_id(referral_id)
    users.push(reference.id)
    # if !reference_1.parent_id.blank?
    #   reference_2 = User.find(reference_1.parent_id)
    #   users.push(reference_2.id)
    #   if !reference_2.parent_id.blank?
    #     reference_3 = User.find(reference_2.parent_id)
    #     users.push(reference_3.id)
    #     if !reference_3.parent_id.blank?
    #       reference_4 = User.find(reference_3.parent_id)
    #       users.push(reference_4.id)
    #     end
    #   end
    # end
  	until reference.parent_id.blank? do
  	  reference = User.find(reference.parent_id)
  	  users.push(reference.id)
  	end

  	return users.uniq
  end
end
