FROM node:20.18.0-slim
WORKDIR /usr/node/app/user-service

COPY ./api/user-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/user-service
COPY ./api/user-service .

ENV TZ=Europe/Paris

EXPOSE 3001

USER node

CMD ["npm", "run", "dev"]