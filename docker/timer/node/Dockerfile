FROM node:20.18.0-slim
WORKDIR /usr/node/app/timer-service

COPY ./api/timer-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/timer-service
COPY ./api/timer-service .

ENV TZ=Europe/Paris

EXPOSE 3001

USER node

CMD ["npm", "run", "dev"]