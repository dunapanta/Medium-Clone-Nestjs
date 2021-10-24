## Clase 3
* Module in Nestjs -> the way how nestjs structure an application is through dependency injection
* We need modules to isolate logic and split it
* how its working
* main.ts  --> app.module --> app.controller, app.service

## Clase 4 - Controller
* Entity of the list of Tags
* A good aproach is to isolate everything inside modules
* A convection name is to name the modules as singular
* The file consist of name of module . postfix module . extension
* Create Module
* Bind new module in app.module in imports array
* Create the controller --> Controller is a place where we define in all our APIs --> in nestjs the only place where we registry our urls
* Bind the controller to the module this called Dependency Injection (we are injected dependencies and split the application in modules)
* Define the route inside Controller with a function is important add the decorator according to the method
* run with yarn start:dev for watch mode

## Clase 5 - Services
* Actually we can write  the hole logic (connecting to database, fetching data, etc) directly on controller
* But a better aproach is to use services
* Services is some additional class with some methods
* We can create the service where we can writte all buisness logic related
* Need to registed as an injectable service for the nestjs application
* We can do that with Injectable
* In Service we define the method that will return the data
* To use the service in the controller we need register insider the module
* We do that with providers (another array)
* The idea is that the service is also isolated inside the module
* Now we can use the service in the controller, we need a constructor for that
* Inside constructor we need to define all services that we want to use inside the controller
* This approach is better becouse we isolate buisness logic on service, also we can share the service between different modules.
* We are using typescript so we should add types on service method and on the controller

## Clase 6 - Absolute path nestjs

## Clase 7- Postgres
* This app have a lot of relations thats why we choose a relational database
* With mongodb can also build relations, but it takes more time and effort and is not really better than traditional databases
* to connect to postgress
`sudo -u postgres psql`
* Show all databases --> It looks like a normal table
`\l`
* Show all users --> display users
`\du`
* We need to create a user to manage the database we will create, becouse we dont want to use useperuser postgres 
* Create database 
`create database mediumclone;`
* Create user 
`create user daniel with encrypted password 'password';`
* Privilegies for user to manage the database
`grant all privileges on database mediumclone to daniel;`

## Clase 7- Configure database inside the app
* First configure TypeORM
* Install `yarn add typeorm`
* Create new file on src `ormconfig.ts` , inside we provide the credentials for database and configuration for TypeORM
```
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'daniel',
  password: '123456',
  database: 'mediumclone',
};

export default config;

```
* We need to install postgres `yarn add pg`
* We need to install bidings for nestjs and TypeORM
* Install `yarn add @nestjs/typeorm`
* Inside `app.module.ts` we need to add TypeOrmModule
`imports: [TypeOrmModule.forRoot(ormconfig), TagModule],`