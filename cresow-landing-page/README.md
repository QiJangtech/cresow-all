# Crescow Landing

- make sure ruby, sass, grunt is installed
- execute npm install
- execute grunt

## Deploy the site

$ docker-compose up -d

Go to [http://localhost:8080](http://localhost:8080)

## Install node modules

$ docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app digitallyseamless/nodejs-bower-grunt npm install

## Running grunt

$ docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app digitallyseamless/nodejs-bower-grunt grunt