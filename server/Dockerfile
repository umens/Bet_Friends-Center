FROM node:9-alpine

COPY package.json yarn.lock ./

# RUN yarn && npm test
RUN yarn

WORKDIR /usr/src/app
EXPOSE 3000

ADD . /usr/src/app

CMD ["npm", "start"]