FROM node:16-alpine as development
ARG NODE_ENV=dockerDevelopment
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install -g nodemon
RUN npm install
COPY . .



FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i --only=production
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 80
CMD ["node","dist/server-app/src/app.js"]