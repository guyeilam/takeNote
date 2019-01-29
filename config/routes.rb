Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root' 
  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :notes, only: [:index, :show]
    resources :notebooks, only: [:create, :index, :show, :update, :destroy] do
      resources :notes, only: [:index]
    end
  end
end
