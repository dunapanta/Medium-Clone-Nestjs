## Clase 3
* Module in Nestjs -> the way how nestjs structure an application is through dependency injection
* We need modules to isolate logic and slit it
* how its working
* main.ts  --> app.module --> app.controller --> app.service

## Clase 4
* Entity of the list of Tags
* A goood aproach is to isolate everything inside modules
* A convection name is to name the modules as singular
* The file consist of name of module . postfix module . extension
* Create Module
* Bind new module in app.module in imports array
* Create the controller --> Controller is a place where we define in all our APIs --> in nestjs the only place where we registry our urls
* Bind the controller to the module this called Dependency Injection (we are injected dependencies and split the application in modules)
* Define the route inside Controller with a function is important add the decorator according to the method
* run with yarn start:dev for watch mode