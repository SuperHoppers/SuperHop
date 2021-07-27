# SuperHoppers

An online shopping super-store for all your superpower needs!

## <a href="https://superhoppers.herokuapp.com/"> Deployed on Heroku </a>

## Setup

<p>If you want to play around with SuperHoppers, feel free to clone our repo. To start, please enter the following commands on your terminal: </p>

-   `npm install`
-   Create two postgres databases (`superhop`):
-   These commands will create both your **development** and **test** databases

-   By default, running `npm test` will use your test database, while
    regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

-   start:dev will both start your server and build your client side files using webpack
-   start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
-   start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
