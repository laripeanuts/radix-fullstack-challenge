<div align="center" style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
  <img src="./apps/frontend/public/logo.jpeg" width="200" alt="Radix">
  <br />
  <strong>Fullstack application to track and report the most import equipment's measurements</strong>
</div>

# **Radix Fullstack Challenge**

- [**Radix Fullstack Challenge**](#radix-fullstack-challenge)
  - [About the project](#about-the-project)
    - [Backend](#backend)
      - [Architecture](#architecture)
      - [Features](#features)
      - [Main libraries](#main-libraries)
    - [Frontend](#frontend)
      - [Requirements](#requirements)
      - [Features](#features-1)
      - [Main libraries](#main-libraries-1)
  - [How to run the project](#how-to-run-the-project)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Dev](#dev)
    - [Production](#production)
  - [Try out!](#try-out)
  - [Expanding the project](#expanding-the-project)

## About the project

This project was build in a single repository, with the backend in the `backend` folder and the frontend in the `frontend` folder both in the root folder, to make it easier to run the project and to progress in the development. Was used [TurboRepo](https://turbo.fish/) to manage the monorepo, it brings the speed and a more organized way to manage the dependencies.

### Backend

The backend was developed using Node.js typed with NestJS and Prisma. The database used was PostgreSQL.

#### Architecture

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

All endpoint has a e2e test.

#### Main libraries

- [NestJS](https://nestjs.com/) beacause is the fastest way to build a Node.js application with TypeScript inside my knowledge
- [Prisma](https://www.prisma.io/) for the development of the database layer with good type safety
- [Zod](https://zod.dev/) for the validation

### Frontend

Was developed using React with TypeScript using Vite as a bundler.

#### Requirements

- [x] User can authenticate
- [x] User can register
- [x] User logged in can see all the equipment
- [x] User logged in can upload a CSV file to register a new equipment
- [x] User logged in can see the stats available
- [x] User logged in can create a new equipment

#### Features

- [x] Authentication
- [x] Routes protection
- [x] Api integration
- [x] Two different layouts, one for users routes and another for the application itself
- [x] Theme switcher between light and dark mode
- [x] Chart to show the stats
- [x] Context with the user data

#### Main libraries

- [TanStack Router](https://tanstack.com/router/latest) for the a file based routing
- [TanStack Query](https://tanstack.com/query/latest) for deal with data fetching and caching
- [React Hook Form](https://react-hook-form.com/) for the forms
- [Zod](https://zod.dev/) for the validation
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Shadcn](https://shadcn.com/) for the components
- [Recharts](https://recharts.org/en-US/) for the charts

## How to run the project

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [pNPM](https://pnpm.io/)
- [Docker](https://www.docker.com/) (optional)

### Setup

1. Clone the .env.example file in the root folder, the `backend` and the `frontend` folders and rename it to `.env`. Add your own keys to the files.

2. In the root folder, run the following command to install the dependencies:

```bash
pnpm install
```

3. Setup the database:

- Initialize db in a docker compose container or run a local instance of PostgreSQL, don't forget to change the `DATABASE_URL` in the `.env` file to your database url. To run the docker compose, run the following command:

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
- [ ] User can register a new equipment on the frontend
- [ ] Publish the application in a cloud service
- [ ] Take advantage of the monorepo to share code between the frontend and the backend
