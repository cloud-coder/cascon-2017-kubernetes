FROM node:boron
WORKDIR /usr/src/sampleApp
COPY app/package.json app/package-lock.json ./
RUN npm install
COPY app .
EXPOSE 3080
RUN mkdir -p /usr/src/data
RUN touch /usr/src/data/books-storage.json
VOLUME [ "/usr/src/data" ]
ENV STORAGE_PATH=/usr/src/data/books-storage.json
CMD [ "npm", "start" ]

