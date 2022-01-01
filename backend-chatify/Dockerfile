FROM node:14.18.0

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY ./build .

EXPOSE 4000

CMD [ "node", "index.js" ]