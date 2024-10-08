FROM node:lts-slim

WORKDIR /usr/node/app/src

COPY ../package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]