require 'test_helper'

class WithdrawalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @withdrawal = withdrawals(:one)
  end

  test "should get index" do
    get withdrawals_url, as: :json
    assert_response :success
  end

  test "should create withdrawal" do
    assert_difference('Withdrawal.count') do
      post withdrawals_url, params: { withdrawal: { amount_eth: @withdrawal.amount_eth, user_id: @withdrawal.user_id, withdrawal_status_id: @withdrawal.withdrawal_status_id } }, as: :json
    end

    assert_response 201
  end

  test "should show withdrawal" do
    get withdrawal_url(@withdrawal), as: :json
    assert_response :success
  end

  test "should update withdrawal" do
    patch withdrawal_url(@withdrawal), params: { withdrawal: { amount_eth: @withdrawal.amount_eth, user_id: @withdrawal.user_id, withdrawal_status_id: @withdrawal.withdrawal_status_id } }, as: :json
    assert_response 200
  end

  test "should destroy withdrawal" do
    assert_difference('Withdrawal.count', -1) do
      delete withdrawal_url(@withdrawal), as: :json
    end

    assert_response 204
  end
end
