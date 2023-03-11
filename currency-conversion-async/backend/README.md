# currency-exchange-async

## Project post
https://blog.henriquew.com/currency-conversion-async

## Project technologies
- Localstack (SQS);
- NestJS;
- MongoDB;
- Mail (mailtrap.io)
- Exchange API (api.apilayer.com)

## How can I run?
First tell me, do you want to run with docker (recommended if you want just to run) or to work on?

### I want to run with docker
1. Copy the file `.env-docker` and rename it to `.env`
2. Fill out the ENVs 
2.1 Access https://apilayer.com/marketplace/currency_data-api sign up and get a token to fill out the env `EXCHANGE_API_KEY`
2.2 Access https://mailtrap.io sign up and get the credential to fill these two fields `MAIL_USER` and `MAIL_PASS`
3. Install the dependencies (`yarn`)
3. Run the command `docker-compose up -d`
4. The api will be running at `http://localhost:8080`
5. Now you have to run the frontend https://github.com/henriqueweiand/nestjs-tests-lab/blob/master/currency-conversion-async/frontend/README.md

### I want to work on
1. Copy the file `.env.example` and rename it to `.env`
2. Fill out the ENVs 
2.1 Access https://apilayer.com/marketplace/currency_data-api sign up and get a token to fill out the env `EXCHANGE_API_KEY`
2.2 Access https://mailtrap.io sign up and get the credential to fill these two fields `MAIL_USER` and `MAIL_PASS`
3. Install the dependencies (`yarn`)
4. Comment the lines referent to `app` inside of the `docker-compose.yml` (or remove)
3. Run the command `docker-compose up -d`
5. Run the command `yarn stard:dev`
5. The api will be running at `http://localhost:8080`
6. Now you have to run the frontend https://github.com/henriqueweiand/nestjs-tests-lab/blob/master/currency-conversion-async/frontend/README.md

`Application use/flow you can check out on the blog post`

## Technical class flow

![Preview](https://raw.githubusercontent.com/henriqueweiand/nestjs-tests-lab/master/currency-conversion-async/assets/class-flow-diagram.png)