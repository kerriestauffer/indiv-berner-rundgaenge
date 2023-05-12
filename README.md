# indiv-berner-rundgaenge

To install all the dependencies, run the script:

```sh
./setup.sh
```

# frontend

The frontend is an [angular](https://angular.io/) single page application.

It needs a build step for two reasons:

- To turn the angular code into a bundle that can be served by a web server
- To turn typescript code into pure javascript code that runs in the browser

To start it, do the following:

```sh
cd frontend
npm run start
```

# backend

The backend is a [nest](https://nestjs.com/) node application.

It needs a build step to transpile typescript into javascript.

To start it, do the following:

```sh
cd backend
npm run start:dev # will also start a mongo database in a docker container
```