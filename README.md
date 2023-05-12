# indiv-berner-rundgaenge

To install all the dependencies, run the script:

```sh
./setup.sh
```

## Architecture

### Frontend

The frontend is an [angular](https://angular.io/) single page application.

It needs a build step for two reasons:

- To turn the angular code into a bundle that can be served by a web server
- To turn typescript code into pure javascript code that runs in the browser

To start it, do the following:

```sh
cd frontend
npm run start
```

### Backend

The backend is a [nest](https://nestjs.com/) node application.

It needs a build step to transpile typescript into javascript.

To start it, do the following:

```sh
cd backend
npm run start:dev # will also start a mongo database in a docker container
```

### Database

The database is a [mongo](https://www.mongodb.com/) database accessed by the backend.

## Distribution

The provided dockerfile builds the frontend and backend and generates one image which will run both.

The following environment variables can be provided at runtime:

- `PRODUCTION`: Can be `true` or `false`. Sets some prod specific things and makes seeding impossible.
- `SEED_MONGO`: Can be `true` or `false`. Whether to seed the mongo database.
- `MONGO_URL`: A string, should be a mongodb connection uri.
- `MONGO_DB`: A string, should be the name of the database to use.
- `PORT`: A number, the port to use instead of the default 3000.
- `API_PREFIX`: An optional prefix for the backend api. Defaults to `/api`.

## Deployment

The provided docker compose file is an example for how to deploy the application.