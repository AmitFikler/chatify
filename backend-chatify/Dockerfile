FROM node:14.18.0-alpine3.12

COPY ["package.json", "package-lock.json*", "./backend/"]

WORKDIR /backend

RUN npm install 

COPY ./build .

EXPOSE 4000

CMD [ "node", "index.js" ]