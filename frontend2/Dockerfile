FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT 3007

CMD [ "npm", "run", "start" ]