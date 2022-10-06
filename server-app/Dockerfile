FROM node:16-alpine as development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i --only=production
COPY --from=development /usr/src/app/dist ./dist
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","dist/app.js"]