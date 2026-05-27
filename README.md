# Interactive Form Builder Monorepo

> **Accomplished the creation of a full-stack, scalable interactive form builder application, as measured by the ability for users to seamlessly create, deploy, and securely restrict access to public, private, and unlisted forms, by architecting a modern monorepo utilizing Next.js, Express, tRPC, Drizzle ORM, and PostgreSQL.**

![Database ER Diagram](Asset/ER-Diagram.png)

## Overview

This project is a modern, full-stack monorepo designed to help users dynamically build, customize, and deploy interactive forms. The robust architecture strictly separates the frontend client (Next.js) from the backend API (Express) while maintaining 100% end-to-end type safety using tRPC.

### Core Features
- **Dynamic Form Builder:** A rich UI allowing users to visually construct forms with various input types.
- **Access Control:** Granular control over form visibility:
  - **Public:** Open for anyone to submit.
  - **Private:** Strictly restricted to a specific list of allowed emails via JWT authentication.
  - **Unlisted/Draft:** Kept strictly offline for editing only.
- **End-to-End Type Safety:** tRPC ensures that the data moving between the frontend and database perfectly matches the expected schemas.
- **OpenAPI Documentation:** The API self-documents and provides an interactive Scalar/OpenAPI dashboard at `/docs`.

---

## Architecture & Tech Stack

This repository is structured as a [Turborepo](https://turborepo.org/) to easily share packages across apps.

- **Frontend (`apps/web`):** Next.js 14, React, Tailwind CSS, Zustand, tRPC Client.
- **Backend (`apps/api`):** Express.js, tRPC Server, JWT Authentication.
- **Database Layer (`packages/database`):** PostgreSQL, Drizzle ORM.
- **Shared Logic (`packages/trpc`):** Shared tRPC routes and Zod validation schemas.

---

## Running Locally

To get this project running on your local machine, follow these steps:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (Package manager)
- [Docker](https://www.docker.com/) & Docker Compose (For the database)

### 2. Environment Variables
Create a `.env` file at the root of the project (you can copy the `.env.example` file if available) and add the following:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dev
NEXT_PUBLIC_API_URL=http://localhost:8000/trpc
WEB_URL=http://localhost:3000
DOC_URL=http://localhost:4000
JWT_SECRET=your_super_secret_jwt_string
SALT=12
NODE_ENV="development"
```

### 3. Start the Database
Spin up the local PostgreSQL database using Docker Compose:
```bash
docker-compose up -d
```

### 4. Install Dependencies
Install all required Node modules across the monorepo:
```bash
pnpm install
```

### 5. Push the Database Schema
Ensure the Postgres database is completely up to date with your Drizzle schemas:
```bash
pnpm run db:push
```
*(Note: depending on your setup, you can also run `pnpm run db:generate` and `pnpm run db:migrate` if using migrations)*

### 6. Start the Development Server
Use Turborepo to concurrently start the Next.js frontend and Express backend:
```bash
pnpm run dev
```

### 7. Access the Apps
- **Frontend App:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000/trpc`
- **Interactive API Docs:** `http://localhost:8000/docs`
