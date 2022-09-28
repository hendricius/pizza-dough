FROM ruby:3.1

ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

RUN gem install bundler
RUN gem install foreman

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN bundle install

ADD . $INSTALL_PATH
