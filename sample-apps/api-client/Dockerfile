FROM node:boron
WORKDIR /usr/src/sampleApp
COPY app/package.json app/package-lock.json ./
RUN npm install
COPY app .
EXPOSE 3081
ENV API_HOST=localhost
ENV API_PORT=3080
CMD [ "npm", "start" ]

