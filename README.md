# tictactrip-assignment

### Required
- Docker
- Docker Compose

### Development
Once you have Docker and Docker Compose installed 
```bash
make build-dev
make up-dev
```
The server should be running on http://localhost:4000/

### Production
```bash
make build-prod
make up-prod
```
The server should be running on http://localhost:4001/

### Tests
```bash
make build-test
make up-test
```

See the Makefile for more commands

## API

#### Authentication token
```bash
curl --location --request POST 'http://localhost:4000/api/token' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "email@email.com"}'
```


#### Justify text
```bash
curl --location --request POST 'http://localhost:4000/api/justify' \
--header 'Authorization: Bearer <your token>' \
--header 'Content-Type: text/plain' \
--data-raw 'some text to justify'
```

## Online API

#### Authentication token
```bash
curl --location --request POST 'http://swann.fun/api/token' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "email@email.com"}'
```

#### Justify text
```bash
curl --location --request POST 'http://swann.fun/api/justify' \
--header 'Authorization: Bearer <your token>' \
--header 'Content-Type: text/plain' \
--data-raw 'some text to justify'
```