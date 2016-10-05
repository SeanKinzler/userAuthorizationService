FROM node:argon
RUN mkdir -p /usr/src/auth
WORKDIR /usr/src/auth
COPY package.json /usr/src/auth
RUN npm install
RUN npm install -g forever
COPY . /usr/src/auth
EXPOSE 8080
CMD [ "npm", "run", "deploy" ]