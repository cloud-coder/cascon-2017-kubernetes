FROM node:boron
WORKDIR /usr/src/sampleApp
COPY app/package.json app/package-lock.json ./
RUN npm install
COPY app .
EXPOSE 3080
CMD [ "npm", "start" ]

