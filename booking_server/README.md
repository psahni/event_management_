### Build docker image
`
  $ docker build -t booking_server_app:latest -f Dockerfile.dev .
`

### Start DB
`
  $ docker-compose up
`

### Start Docker container
`
  $  docker build -t  booking_server_app:latest  -f Dockerfile.dev .
`

`
  $ docker run -p 3333:3333 booking_server_app:latest
`

### Using Docker Compose

`
  $ docker compose up
`

* If you use only DB (Windows)
`
  $ docker compose up postgres
`

* Start app server individually in the same network

`
  $ docker run -p 3333:3333 --network booking_server_default booking_server_app:latest
`

### Windows
* I was some issues with air and docker.

#### Start DB service
* $ docker compose up postgres

* Don't use docker container for starting app server on windows, it does not integrate well with air.
Start the air directly - `air -- http_server`

### Mongo DB
```
  sudo systemctl start mongod
```

### Notes
* In order to generate the uuid, you need to enable the extention
* Go to psql console or any PG client

```
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  select uuid_generate_v4();
```

### Redis commander

`sudo /etc/init.d/redis-server start`

Install redis commander `https://github.com/joeferner/redis-commander` to view redis data in GUI

`redis-commander` 

This command will start server on http://127.0.0.1:8081/

------------------------------------------------------------------------------------

### How to start the server

1. Start Redis
2. Start postgres
3. Start MongoDB 
4. Start GO server (I am using windows)

Extra
* You can use mongo Atlas
* Redis commander
* Postgres Client - DBeaver


### Load Events From Event App

`make cache_events`