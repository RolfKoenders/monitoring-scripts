FROM node:7-alpine

WORKDIR /src
ADD . .

RUN apk add --no-cache bash
RUN npm install

CMD ["node", "pihole.js"];