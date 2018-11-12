require 'test_helper'

class WithdrawalStatusesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @withdrawal_status = withdrawal_statuses(:one)
  end

  test "should get index" do
    get withdrawal_statuses_url, as: :json
    assert_response :success
  end

  test "should create withdrawal_status" do
    assert_difference('WithdrawalStatus.count') do
      post withdrawal_statuses_url, params: { withdrawal_status: { name: @withdrawal_status.name } }, as: :json
    end

    assert_response 201
  end

  test "should show withdrawal_status" do
    get withdrawal_status_url(@withdrawal_status), as: :json
    assert_response :success
  end

  test "should update withdrawal_status" do
    patch withdrawal_status_url(@withdrawal_status), params: { withdrawal_status: { name: @withdrawal_status.name } }, as: :json
    assert_response 200
  end

  test "should destroy withdrawal_status" do
    assert_difference('WithdrawalStatus.count', -1) do
      delete withdrawal_status_url(@withdrawal_status), as: :json
    end

    assert_response 204
  end
end
