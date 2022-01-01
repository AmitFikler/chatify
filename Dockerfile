# pull official base image
FROM node:14.18.0-alpine3.12

# set working directory
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "start"]