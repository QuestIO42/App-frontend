FROM node:21-alpine

WORKDIR /frontend
COPY package.json .
RUN npm i
COPY . .

# questio.vlab.dc.ufscar.br
RUN npm run build 

# dev.vlab.dc.ufscar.br
EXPOSE 3000
CMD ["npm", "run", "start"]