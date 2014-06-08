Rails.application.routes.draw do
  namespace :api do
    resources :quizzes
  end

  get '*foo', to: 'landing#index'
end
