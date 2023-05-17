FROM node:18

WORKDIR /dapp

COPY package*.json ./

COPY .env ./

COPY tsconfig.json ./

RUN npm install

COPY . .

ENV PORT=5173

EXPOSE 5173

CMD [ "npm", "run", "dev" ]