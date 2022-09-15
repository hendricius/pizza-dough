Rails.application.routes.draw do
  # Defines the root path route ("/")
  root "static#index"

  get "result", to: redirect { |params, request| "/dough?#{request.params.to_query}" }
  get "dough", to: "static#dough"
end
