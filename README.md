# TypeORM Express User Auth API

A Node.js RESTful API for user authentication and dashboard access, built with Express, TypeScript, and TypeORM.

## Features
- User registration and login with hashed passwords
- JWT-based authentication middleware
- Protected user dashboard route
- Modular controller, middleware, and route structure
- Environment variable support

## Project Structure
```
src/
  controller/
    auth/
      login.ts
      register.ts
    user/
      dashboard.ts
  database/
    dataSource.ts
  entities/
    User.ts
  middlewares/
    userAuthMiddleware.ts
  routes/
    auth.ts
    userDashboard.ts
index.ts
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL (or your preferred database, update config as needed)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd typeorm
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add:
   ```env
   JWT_SECRET=your_jwt_secret
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=your_db_name
   ```
4. Run database migrations (if any):
   ```sh
   # Example for TypeORM CLI
   npx typeorm migration:run
   ```

### Running the App
```sh
npm run dev
# or
yarn dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Dashboard (Protected)
- `GET /api/user/dashboard` — Get user dashboard data (requires JWT in `Authorization` header)

## Environment Variables
See `.env.example` for all available environment variables.

## License
MIT
