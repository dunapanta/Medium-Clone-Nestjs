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

## Clase 8- Configure database inside the app
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


## Clase 9- Create Tag Entity
* Entity is the representation of database table, similar to Model on other ORM, this is Object or Entity wich we will comunicate
* We can define the fields of the Enity
* inside tag folder we create `tag.entity.ts`,
* All ids on postgress are numbers
* After specify the entity  we need to add the property `entities` on `ormconfig.ts`, we provide this and TypeORM can generate them (Is not the best way, we do it just for the start)
`entities: [__dirname + '/**/*.entity{.ts,.js}'],`
* We also add `synchronize: true` on `ormconfig.ts` Every time when we start our web application TypeORM will synchonize all our entities and create table in database if needed
* Connect database in postgress `\c mediumclone;`
* See all the tables `\dt` we see that was successfully created
* To se the content of the table `\d tags`
* TypeORM isolates a lot of stuff creating entities

## Clase 10 - Working with tags repository
* Create new records for tags on psql
* In postgres we use `"` for names of the table and `'` for strings
```
INSERT INTO tags(name) VALUES('dragons');
```
* Verify `SELECT * FROM tags;`
* Now we use on nestjs, we work with database only inside service
* Repository is a special pattern how we are getting things inside our service
* The operation to get some data from database is asynchronus,  thats why findAll returns a Promise and we specify data type using generic of typescript
* We need to inject the Repository on th constructor and need to update to async on tag.service
```
@Injectable()
export class TagService {
  constructor(
    //We want Repository to work with this table
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }
}

```
* also update on controller
```
@Controller('tags')
export class TagController {
  // Constructor define all our services that we want to use inside this controlles
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }
}
```
* And on app.module we need to specify TagEntity
` imports: [TypeOrmModule.forFeature([TagEntity])],`

* For structure the data response we can do it on controller and update typescript data type
```
@Controller('tags')
export class TagController {
  // Constructor define all our services that we want to use inside this controlles
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}

```

## Clase 11 - Creating Migrations
### - Theory
* The option `synchronize: true` only exist on TypeORM in other frameworks we use migrations
* We create table through migrations, that means that we create new migration and inside we create a table
* It is impotant becouse we save somewhere how we are changing our database
* Every single time when we need to update something in database we are migrating our SCHEMA
* It means we have the old state and we are getting a new state trough our migration
* It works similar to git that you have commits in the repository and you can switch to older versions
* Also `synchronize: true` is unsafe for production becouse there we dont want to remove any data, wich means we must fully control how we create tables
* Always use migrations and never `synchronize: true` for a real project.
### - Code
* Now I have only Entity tags wich means in psql wef have tags table
* Normaly 
 - We want to start our application or at least set up our project
 - Then we want to create our database completly from cli
 - Then we want to migrate all our migrations that we have
 - Then we have schema of the table
 * Drop the database
 * On `package.json` we add `"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/ormconfig.ts" to create the command
 * Now to use `typeorm` command inside other command we need to ejecute with `yarn`
 * Now create command `"db:drop": "yarn typeorm schema:drop"` this will delete all tables inside database
 * Now we can excecute `yarn db:drop`
 * The next step is to create a migration --> We have entity tag and we want to create a migration
 * Inside `package.json` we add command `"db:create": "yarn typeorm migration:generate -- -n"` --> -- -n this is the atribute and we can provide the name
 * Then on `ormconfg.ts` we add migations path `migrations: [__dirname + '/migrations/**/*{.ts, .js}'],` we want to store all our migrations in a single part inside source
 * Also we need to provide configuration for cli on `ormconfg.ts` we add
 ```
 cli: {
      migrationsDir: 'src/migrations'
  }
```
* We excecute `yarn db:create CreateTags` ---> CreateTags is just a filename. Migration has been created based on our Entity Tag
* Inside the new file we have two functions up and down, the idea is that we can rollback our migration
* In up function is define what migration is doing 
* And if we want to rollback we can use down
* How we can excecute is migation? 
* Normaly when we just setup the empty database we want to apply the correct schema, wich means we need to run all our migrations that we have and genearate the latest version of our schema
* To do so we create a new commad to run our migrations
* On `package.json` we add `"db:migrate": "yarn typeorm migration:run"`
* `yarn db:migrate` This command excecutes all our migration in correct order
* It creates tables migrations and tags
```
mediumclone=# select * from migrations;
 id |   timestamp   |          name           
----+---------------+-------------------------
  1 | 1635126349162 | CreateTags1635126349162
(1 row)
```
* TypeORM it stores the migrations, it will use this information to understand what migrations it needs to excecute
* When we want to create a new migration TypeOrm checks in what state our table and database is and what entities we have, if we have something different then thsi changes will go in this migration
* Every single time when we are changing database you create new migration and this is a must, in other way you dont know what you really change
* In production normaly clone the project and also excecute migrationand later if production want to change a field or add new table, simple locally create new migration and then exceute this migration on production, and you are sure you wont break the database becouse inside migration you are really know how you are changing the state