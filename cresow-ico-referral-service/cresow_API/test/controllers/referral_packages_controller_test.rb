require 'test_helper'

class ReferralPackagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @referral_package = referral_packages(:one)
  end

  test "should get index" do
    get referral_packages_url, as: :json
    assert_response :success
  end

  test "should create referral_package" do
    assert_difference('ReferralPackage.count') do
      post referral_packages_url, params: { referral_package: { name: @referral_package.name } }, as: :json
    end

    assert_response 201
  end

  test "should show referral_package" do
    get referral_package_url(@referral_package), as: :json
    assert_response :success
  end

  test "should update referral_package" do
    patch referral_package_url(@referral_package), params: { referral_package: { name: @referral_package.name } }, as: :json
    assert_response 200
  end

  test "should destroy referral_package" do
    assert_difference('ReferralPackage.count', -1) do
      delete referral_package_url(@referral_package), as: :json
    end

    assert_response 204
  end
end
