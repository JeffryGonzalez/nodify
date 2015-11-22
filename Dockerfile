FROM node
MAINTAINER Jeffry Gonzalez

EXPOSE 8000

RUN mkdir /app

RUN npm install -g gulp

WORKDIR /app

ADD package.json /app/package.json

RUN npm install

CMD ["gulp"]