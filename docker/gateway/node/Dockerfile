FROM node:20.18.0-slim
WORKDIR /usr/node/app/gateway-service

COPY ./api/gateway-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/gateway-service
COPY ./api/gateway-service .

ENV TZ=Europe/Paris

EXPOSE 3000

USER node

CMD ["npm", "run", "dev"]