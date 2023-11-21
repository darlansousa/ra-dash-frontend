FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --quiet

COPY . /usr/src/app

EXPOSE 3001

CMD ["npm", "start"]