FROM mhart/alpine-node:6

RUN mkdir /src
WORKDIR /src
ADD . .

RUN apk add --no-cache bash curl
RUN chmod +x run.sh
RUN npm install

CMD ["./run.sh"]