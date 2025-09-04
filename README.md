# Caretaker Management API

A NestJS application with TypeORM and PostgreSQL for managing caretakers. This application provides full CRUD operations for caretaker management.

## Features

- ✅ Create caretakers
- ✅ List all caretakers
- ✅ Read individual caretaker details
- ✅ Update caretaker information
- ✅ Delete caretakers
- ✅ Search caretakers by name or email
- ✅ Filter active caretakers only
- ✅ PostgreSQL database integration
- ✅ TypeORM for database operations

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher)
2. **PostgreSQL** installed and running
3. **npm** or **yarn** package manager

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL Database:**
   
   First, make sure PostgreSQL is running on your system. Then create a database:
   
   ```sql
   -- Connect to PostgreSQL
   psql -U postgres
   
   -- Create database
   CREATE DATABASE caretaker_db;
   
   -- Exit psql
   \q
   ```

4. **Configure Environment Variables:**
   
   Create a `.env` file in the root directory with the following content:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password_here
   DB_NAME=caretaker_db
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```
   
   **Important:** Replace `your_password_here` with your actual PostgreSQL password.

## Running the Application

1. **Development mode:**
   ```bash
   npm run start:dev
   ```

2. **Production mode:**
   ```bash
   npm run build
   npm run start:prod
   ```

3. **The application will be available at:**
   ```
   http://localhost:3000/api
   ```

## API Endpoints

### Caretakers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/caretakers` | Create a new caretaker |
| `GET` | `/api/caretakers` | Get all caretakers |
| `GET` | `/api/caretakers/active` | Get active caretakers only |
| `GET` | `/api/caretakers/search?q=query` | Search caretakers by name or email |
| `GET` | `/api/caretakers/:id` | Get a specific caretaker |
| `PATCH` | `/api/caretakers/:id` | Update a caretaker |
| `DELETE` | `/api/caretakers/:id` | Delete a caretaker |

## Example API Usage

### Create a Caretaker
```bash
curl -X POST http://localhost:3000/api/caretakers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "dateOfBirth": "1990-01-01",
    "qualifications": "Nursing Degree",
    "experience": "5 years in elderly care",
    "hourlyRate": 25.50
  }'
```

### Get All Caretakers
```bash
curl http://localhost:3000/api/caretakers
```

### Get a Specific Caretaker
```bash
curl http://localhost:3000/api/caretakers/1
```

### Update a Caretaker
```bash
curl -X PATCH http://localhost:3000/api/caretakers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "hourlyRate": 30.00
  }'
```

### Search Caretakers
```bash
curl "http://localhost:3000/api/caretakers/search?q=john"
```

### Delete a Caretaker
```bash
curl -X DELETE http://localhost:3000/api/caretakers/1
```

## Database Schema

The application automatically creates the following table structure:

```sql
CREATE TABLE caretakers (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  dateOfBirth DATE,
  qualifications TEXT,
  experience TEXT,
  isActive BOOLEAN DEFAULT true,
  hourlyRate DECIMAL(10,2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Database Connection Issues

1. **Check PostgreSQL is running:**
   ```bash
   # Windows
   net start postgresql
   
   # Linux/Mac
   sudo service postgresql start
   ```

2. **Verify database exists:**
   ```bash
   psql -U postgres -l
   ```

3. **Check connection settings in your .env file**

### Port Already in Use

If port 3000 is already in use, change the PORT in your `.env` file:
```env
PORT=3001
```

### TypeScript Compilation Errors

Make sure all dependencies are installed:
```bash
npm install
```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
└── caretaker/
    ├── caretaker.module.ts
    ├── caretaker.controller.ts
    ├── caretaker.service.ts
    ├── caretaker.entity.ts
    └── dto/
        ├── create-caretaker.dto.ts
        └── update-caretaker.dto.ts
```

## Development

- **Build:** `npm run build`
- **Test:** `npm run test`
- **Lint:** `npm run lint`
- **Format:** `npm run format`

## License

This project is open source and available under the [MIT License](LICENSE).