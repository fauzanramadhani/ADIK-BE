FROM node:slim

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "server.js"]