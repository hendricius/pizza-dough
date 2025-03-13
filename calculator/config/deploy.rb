lock "~> 3.19.2"

set :application, "pizza-calculator"
set :repo_url, "https://github.com/hendricius/pizza-dough.git"
set :repo_tree, "calculator"
set :branch, "main"
set :deploy_to, "/home/bread/#{fetch(:application)}"

set :linked_files, %w{.rbenv-vars}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system storage node_modules}

set :rbenv_type, :user
set :rbenv_ruby, '3.4.2'