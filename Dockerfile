FROM node:21-alpine

WORKDIR /frontend
COPY package.json .
RUN npm i
COPY . .

RUN npm run build
RUN mkdir -p /usr/share/nginx/html
RUN mv dist/* /usr/share/nginx/html

EXPOSE 3000
CMD ["npm", "run", "start"]