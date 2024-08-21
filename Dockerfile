FROM node:21-alpine

WORKDIR /tmp/frontend

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

RUN mkdir -p /usr/share/nginx/html

RUN mv dist/* /usr/share/nginx/html

WORKDIR /

RUN rm -rf /tmp/frontend

