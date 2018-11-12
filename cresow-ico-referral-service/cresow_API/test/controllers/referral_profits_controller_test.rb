require 'test_helper'

class ReferralProfitsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @referral_profit = referral_profits(:one)
  end

  test "should get index" do
    get referral_profits_url, as: :json
    assert_response :success
  end

  test "should create referral_profit" do
    assert_difference('ReferralProfit.count') do
      post referral_profits_url, params: { referral_profit: { profit_level: @referral_profit.profit_level, profit_percentage: @referral_profit.profit_percentage, referral_id: @referral_profit.referral_id } }, as: :json
    end

    assert_response 201
  end

  test "should show referral_profit" do
    get referral_profit_url(@referral_profit), as: :json
    assert_response :success
  end

  test "should update referral_profit" do
    patch referral_profit_url(@referral_profit), params: { referral_profit: { profit_level: @referral_profit.profit_level, profit_percentage: @referral_profit.profit_percentage, referral_id: @referral_profit.referral_id } }, as: :json
    assert_response 200
  end

  test "should destroy referral_profit" do
    assert_difference('ReferralProfit.count', -1) do
      delete referral_profit_url(@referral_profit), as: :json
    end

    assert_response 204
  end
end
