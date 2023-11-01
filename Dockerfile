FROM node:slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . .

ARG APP_PORT
EXPOSE ${APP_PORT}

#Untuk development, supaya bisa pakai nodemon
CMD [ "npm", "start" ]