#!/bin/bash

echo "Starting db service"
docker compose up postgres

echo "Starting Redis"
docker compose up redis
