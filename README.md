# **Radix Fullstack Challenge**

- [**Radix Fullstack Challenge**](#radix-fullstack-challenge)
  - [About the project](#about-the-project)
    - [Backend](#backend)
      - [Architecture:](#architecture)
      - [Features](#features)
    - [Frontend](#frontend)
  - [How to run the project](#how-to-run-the-project)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Dev](#dev)
    - [Production](#production)
  - [Try out!](#try-out)
  - [Expanding the project](#expanding-the-project)

## About the project

### Backend

The backend was developed using Node.js typed with NestJS and Prisma. The database used was PostgreSQL.

#### Architecture:

This repository is organized following the Clean Architecture principles, with the following layers:

- **Core**: Contains the shared files between the layers, like the entities, the errors and the decorators.
- **Config**: Contains the configuration services, like the authentication and env.
- **Domain**: Contains the use cases, repositories, entities and the interfaces of the application.
- **HTTP**: Contains the controllers, validations pipes and the routes.
- **Database**: Contains the databases files, like the repositories, mappings and all the database connections.

#### Features

All endpoints includes a validation pipe, tests e2e and error handling. The routes for user to create an account and authenticate are free of authentication, but the other routes are protected by JWT.

- [x] User:
  - POST
- [x] User/Session:
  - POST Authentication with JWT
- [x] Equipment:
  - POST
  - GET all
- [x] Measurement
  - POST
  - POST via CSV file
  - GET by equipment value average in a specific period

### Frontend

Was developed using React with TypeScript using Vite as a bundler.

## How to run the project

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

The project was developed using [pnpm](https://pnpm.io/), so it is recommended to use it to run the project. But your preferred package manager can be used as well.

### Setup

1. Clone the .env.example file in the root folder, the `backend` and the `frontend` folders and rename it to `.env`. Add your own keys to the files.

2. In the root folder, run the following command to install the dependencies:

```bash
pnpm install
```

3. Setup the database:

- Initialize db in a docker compose container:

```bash
docker-compose up -d
```

- Run the following command to run the migrations:

```bash
pnpm --filter backend run db:migrate:dev
```

- Run the following command to ◊seed the database:

```bash
pnpm --filter backend run db:seed
```

### Dev

Run the following command to start the project as a dev environment:

```bash
pnpm dev
```

To access the project at:

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:3000](http://localhost:3000)

### Production

Run the following command to build the project:

```bash
pnpm build
```

Run the following command to start the project as a production environment:

```bash
pnpm start
```

To access the project, go to [http://localhost:3000](http://localhost:3000). The frontend is served by the backend at the `/` route and the api is served at the `/api` route.

## Try out!

- **Backend:**
  - You can try the api by accessing the `client.http` file in the `backend` root folder, and clicking on the `Send Request` button, but you need to have the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in your VSCode.

## Expanding the project

- [ ] Add tests to the frontend
- [ ] Add pagination to both frontend and backend
- [ ] Storage the CSV files in a cloud service
- [ ] Make a better history of each equipment
- [ ] Publish the application in a cloud service
