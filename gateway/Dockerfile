FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 443

CMD ["npm", "run", "start"]