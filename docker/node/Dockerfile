FROM node:20.18.0-slim
WORKDIR /usr/node/app/

COPY ./api/package*.json .

RUN npm install

WORKDIR /usr/node/app/api
COPY ./api .

ENV TZ=Europe/Paris

EXPOSE 3001

USER node

CMD ["npm", "run", "dev"]