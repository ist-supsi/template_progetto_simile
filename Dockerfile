FROM node:12

ARG FRONTENDAPP=simile

WORKDIR /usr/src/app/$FRONTENDAPP/

COPY package*.json ./
RUN npm i

# TODO: con una cartella condivisa potrebbe non essere necessario copiare la repo
COPY . .

CMD ["npm", "run", "dev"]