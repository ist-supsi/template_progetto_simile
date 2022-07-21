FROM node:12

WORKDIR /usr/src/app/simile

# COPY package*.json ./

RUN npm install

# EXPOSE 8080

# COPY . /usr/src/app/simile
#
CMD ["npm", "run", "dev"]
