Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root' 

  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create, :update]
    resource :session, only: [:create, :destroy]
    resources :notes, only: [:index, :show, :update, :destroy, :create]
    resources :notebooks, only: [:create, :index, :show, :update, :destroy] do
      resources :notes, only: [:index, :create]
    end
    resources :tags, only: [:create, :index, :update, :destroy, :show] do
      resources :taggings, only: [:create, :update, :destroy, :show, :index]
    end
    resources :taggings, only: [:create]
    resources :shares, only: [:index, :create]
    delete '/remove_tagging', to: 'taggings#destroy'
    delete '/unshare_note', to: 'shares#destroy'


  end
end
