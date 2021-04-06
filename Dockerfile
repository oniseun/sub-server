
FROM node:12.13-alpine

WORKDIR /usr/src/sub-server

COPY package*.json ./

COPY .envsample ./.env

COPY ./src ./src

COPY ./test ./test

RUN npm install

EXPOSE 9000
CMD ["npm", "run", "prod"]