# Build
Build from the command line within the folder where the Dockerfile and the app files are located

```
docker build -t sgdpro/sample-app:in-mem .
docker build -t sgdpro/sample-app:in-file .
docker build -t sgdpro/sample-client-app .
```

# Run
Run the the sample containers

### The in *memory* variant
```
docker run --rm --name appfile -d -p 3080:3080 sgdpro/sample-app:in-mem
```

### The in *file* variant
You will need a volume for the json file storage, that is passed to the `run` command.
Create the volume once
```
docker volume create books-storage
docker run --rm --name appfile -d -p 3080:3080 -v books-storage:/usr/src/data sgdpro/sample-app:in-file
```

### The api *client* app
In the command below, replace `9a1d02cd167d` with the actual container ID generated from one of the above run commands
```
docker run --rm --name appclient -d -p 3081:3081 --link 9a1d02cd167d -e "API_HOST=9a1d02cd167d" -e "API_PORT=3080" sgdpro/sample-client-app
```


# Verify it works
_Get_ the books and _Post_ a sample book
```
curl -X GET http://localhost:3080/books
curl -X POST http://localhost:3080/books -H "Content-Type: application/json" -d '{"name": "book3", "author": "smith"}'
```