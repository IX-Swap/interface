FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn run build
