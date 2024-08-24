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



### Notes
* In order to generate the uuid, you need to enable the extention
* Go to psql console or any PG client

```
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  select uuid_generate_v4();
```

### Redis commander

Install redis commander `https://github.com/joeferner/redis-commander` to view redis data in GUI


