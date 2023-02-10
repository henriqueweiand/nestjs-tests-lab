# mongodb-crud-to-do-list

This is a simple project with a few technologies just and real example of to-do-list with mongodb

## This project has

- NestJS
- MongoDB
- Docker / docker-composer
- Tests
- Swagger

## Running

1. install dependencies, you can just run `yarn` or `npm i`
2. Copy `.env.example` to `.env` and change (if necessery) in its content
3. `docker-compose up`
4. access `http://localhost:3000/api`

## Tips

- if you are going to run the service (nestjs) outside of the docker, please remember to change the value of the env `MONGODB_URL`

https://www.youtube.com/watch?v=1Vc6Xw8FMpg
