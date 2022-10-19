FROM node:12

WORKDIR /usr/src/app/simile/

COPY package*.json ./

RUN npm i -S @vue/cli-service
RUN rm -rf node_modules package-lock.json && npm install
# RUN npm install

EXPOSE 8080

# COPY . /usr/src/app/simile
#
# CMD ["npm", "run", "dev"]
