#!/bin/bash

# This deploys the app to heroku
git branch -D heroku
cd ../
git subtree split --branch heroku --prefix calculator/
git checkout heroku
git push -f heroku HEAD:main
git checkout -
