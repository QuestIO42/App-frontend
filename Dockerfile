FROM node:21-alpine

WORKDIR /frontend
COPY package.json .
RUN npm i
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]