FROM node:23-alpine

WORKDIR /usr/src/app

COPY ./ ./
RUN npm install
RUN node src/deployCommands.js
CMD [ "node", "src/index.js" ]
