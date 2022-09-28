# Pizza Dough Calculator

Simple app to calculate pizza dough properties.

## Setup using docker

Just build the image and start everything with:

```bash
make up
```

## Native ruby setup

Setup ruby (check the .ruby-version file).

```bash
rbenv install 3.1.2
gem install bundle
gem install foreman
bundle install
```

## Start the server

```
bin/dev
```

## Credentials

Right now there is only a secret session key. You can override this key. Or
you can ask another dev for the secret key.
