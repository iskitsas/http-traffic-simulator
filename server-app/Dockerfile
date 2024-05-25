FROM node:16-alpine as development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY src ./src
COPY tests ./tests
COPY lib ./lib
COPY package*.json .
COPY tsconfig.json .
RUN npm install -g nodemon
RUN apk add --no-cache python3 make g++
RUN npm install
RUN npm run build

#EXPOSE 4040
#CMD ["npm","run","dev"]

FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i --only=production
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 4040
CMD ["node","dist/src/app.js"]
