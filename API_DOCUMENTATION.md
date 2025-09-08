# Caretaker Management API Documentation

## Overview
This API provides endpoints for managing caretakers with authentication, validation, search, filtering, and pagination capabilities.

## Authentication
All caretaker endpoints are protected and require JWT authentication. Users must register/login first to access caretaker data.

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890" // optional
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

## Caretaker Endpoints
All caretaker endpoints require authentication via JWT Bearer token.

### Create Caretaker
```http
POST /api/caretakers
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890", // optional
  "address": "123 Main St, City, State", // optional
  "dateOfBirth": "1990-01-15", // optional, ISO date string
  "qualifications": "Licensed nurse with 5 years experience", // optional
  "experience": "Worked in various healthcare settings", // optional
  "hourlyRate": 25.50 // optional
}
```

### Get All Caretakers (with Search, Filter, Pagination)
```http
GET /api/caretakers?page=1&limit=10&search=john&sortBy=firstName&sortOrder=ASC
Authorization: Bearer <jwt_token>
```

#### Query Parameters:
- `search`: Search across firstName, lastName, email, qualifications, experience
- `firstName`: Filter by first name (partial match)
- `lastName`: Filter by last name (partial match) 
- `email`: Filter by email (partial match)
- `isActive`: Filter by active status (true/false)
- `minHourlyRate`: Filter by minimum hourly rate
- `maxHourlyRate`: Filter by maximum hourly rate
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (firstName, lastName, email, createdAt, hourlyRate)
- `sortOrder`: Sort direction (ASC, DESC, default: DESC)

#### Response:
```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phone": "+1234567890",
      "address": "123 Main St, City, State",
      "dateOfBirth": "1990-01-15",
      "qualifications": "Licensed nurse with 5 years experience",
      "experience": "Worked in various healthcare settings",
      "isActive": true,
      "hourlyRate": "25.50",
      "createdAt": "2024-01-08T10:30:00.000Z",
      "updatedAt": "2024-01-08T10:30:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### Get Single Caretaker
```http
GET /api/caretakers/:id
Authorization: Bearer <jwt_token>
```

### Update Caretaker
```http
PATCH /api/caretakers/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "Updated Name",
  "hourlyRate": 30.00
}
```

### Delete Caretaker
```http
DELETE /api/caretakers/:id
Authorization: Bearer <jwt_token>
```

## Input Validation
All endpoints include comprehensive input validation:

- **Email**: Must be valid email format
- **Names**: 2-100 characters
- **Phone**: 10-20 characters (optional)
- **Password**: Minimum 6 characters
- **Hourly Rate**: Must be positive number
- **Date of Birth**: Must be valid ISO date string

## Database Migrations
The application uses TypeORM migrations instead of synchronization:

```bash
# Generate new migration
npm run migration:generate -- src/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Environment Variables
Make sure to set these in your `config.env` file:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgresql
DB_NAME=caretaker_db

# Application
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

## Error Handling
The API returns appropriate HTTP status codes and error messages:

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/missing JWT)
- **404**: Not Found (resource doesn't exist)
- **409**: Conflict (duplicate email during registration)
- **500**: Internal Server Error

## Example Usage Flow

1. **Register a user**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
   ```

2. **Login to get JWT token**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Use the token to access caretaker endpoints**:
   ```bash
   curl -X GET http://localhost:3000/api/caretakers \
     -H "Authorization: Bearer <your_jwt_token>"
   ```
