# **Radix Fullstack Challenge**

- [**Radix Fullstack Challenge**](#radix-fullstack-challenge)
  - [About the project](#about-the-project)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [How to run the project](#how-to-run-the-project)
    - [Prerequisites](#prerequisites)
    - [Local](#local)
  - [Try out!](#try-out)

## About the project

### Backend

The backend was developed using Node.js typed with NestJS and Prisma. The database used was PostgreSQL.

### Frontend

Was developed using React with TypeScript using Vite as a bundler.

## How to run the project

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

### Local

The project was developed using [pnpm](https://pnpm.io/), so it is recommended to use it to run the project. But your preferred package manager can be used as well.

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

4. Access the project at:

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:3000](http://localhost:3000)

## Try out! 

- **Backend:**
  - You can try the api by accessing the `client.http` file in the `backend` root folder, and clicking on the `Send Request` button, but you need to have the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in your VSCode.
