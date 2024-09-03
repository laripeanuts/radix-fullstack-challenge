# **Radix Fullstack Challenge**

## About the project

### Backend

The backend was developed using Node.js typed with NestJS and Prisma. The database used was PostgreSQL.

### Frontend



## How to run the project

### Local

The project was developed using [pnpm](https://pnpm.io/), so it is recommended to use it to run the project. But your preferred package manager can be used as well.

1. In the root folder, run the following command to install the dependencies:

```bash
pnpm install
```

2. Run the following command to start the project:

```bash
pnpm dev
```

3. Access the project at:

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:3000](http://localhost:3000)

### Docker

1. Build the image in detached mode on the root folder:

```bash
docker compose up -d
```

> **Obs:** The frontend was added to the api server using a proxy, you can access the frontend in the same server [http://localhost:3000](http://localhost:3000) and the api at [http://localhost:3000/api](http://localhost:3000/api).
