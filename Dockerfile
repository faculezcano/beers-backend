FROM node:16

RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

ENTRYPOINT '.docker/init.sh'