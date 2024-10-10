FROM node:20.18.0-slim

WORKDIR /usr/node/app/src

COPY ../package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]