FROM node:slim

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . .
EXPOSE 5001
CMD [ "npm", "start" ]