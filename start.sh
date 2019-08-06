#!/bin/sh

docker-compose up -d && docker-compose exec -u 1000 app npx sequelize db:migrate