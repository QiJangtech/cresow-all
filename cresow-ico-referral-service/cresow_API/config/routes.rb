Rails.application.routes.draw do
  
  scope 'api' do
    use_doorkeeper
    constraints format: :json do
    	#DEFAULT ROUTES
   		resources :users, except: [:new, :edit]
   		resources :referral_records, only: [:index, :create, :show]
   		resources :wallets, except: [:new, :edit]
   		resources :deposits, except: [:new, :edit]
   		resources :withdrawals, except: [:new, :edit]
   		resources :withdrawal_statuses, only: [:index]
   		resources :referral_packages, except: [:new, :edit]
   		resources :referrals, except: [:new, :edit]
   		resources :referral_profits, except: [:new, :edit]

   		#CUSTOM ROUTES
   		get "/profile/users", to: "users#profile"
   		put "/profile/users/update", to: "users#update_profile"
   		#DASHBOARD ITEMS
   		get "/registered_users", to: "dashboards#registered_users"
   		get "/deposits_and_bonus", to: "dashboards#deposits_and_bonus"
   		#LOGOUT
   		get "/logout", to: "users#logout"

   		#FOR COINSPAYMENT IPN
   		post "/complete/deposit", to: "deposits#complete_deposit"
   		get "/complete/deposit", to: "deposits#complete_deposit"
    end
  end
end
