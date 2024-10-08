#!/bin/bash

echo "Stopping db service"
docker compose down postgres

echo "Stopping Redis"
docker compose down redis
