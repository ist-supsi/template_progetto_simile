FROM node:12

COPY . ./usr/src/app/

WORKDIR /usr/src/app/simile

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
