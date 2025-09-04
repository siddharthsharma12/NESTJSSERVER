# Database Setup - TypeORM Approach

This project uses TypeORM instead of raw SQL for database management. The database setup is handled automatically through TypeORM's features.

## How It Works

### 1. Automatic Schema Creation
- TypeORM automatically creates database tables based on the entity definitions
- The `synchronize: true` option in development mode ensures the database schema matches your entities
- No manual SQL scripts needed!

### 2. Entity-Based Structure
- Database structure is defined in `src/caretaker/caretaker.entity.ts`
- Changes to the entity automatically update the database schema in development
- Type-safe and maintainable

### 3. Automatic Data Seeding
- Sample data is inserted automatically when the application starts
- Seeding logic is in `src/caretaker/caretaker.seeder.ts`
- Prevents duplicate data insertion

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Database**
   Update your `config.env` file with your PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=caretaker_db
   ```

3. **Create Database**
   Create the database in PostgreSQL (only this step requires manual SQL):
   ```sql
   CREATE DATABASE caretaker_db;
   ```

4. **Start Application**
   ```bash
   npm run start:dev
   ```
   
   The application will:
   - Connect to the database
   - Create the `caretakers` table automatically
   - Insert sample data if the table is empty
   - Start the API server

## Benefits of This Approach

- **No Raw SQL**: Everything is handled through TypeORM
- **Type Safety**: Database operations are type-checked
- **Automatic Migrations**: Schema changes are applied automatically in development
- **Maintainable**: Easy to modify database structure by updating entities
- **Consistent**: Same approach works across different database types

## Adding New Data

Instead of writing SQL INSERT statements, you can:

1. **Add to Seeder**: Update `src/caretaker/caretaker.seeder.ts` to include more sample data
2. **Use the API**: Create caretakers through the REST API endpoints
3. **Use TypeORM Repository**: Add data programmatically using the CaretakerService

## Production Considerations

- Set `synchronize: false` in production
- Use proper TypeORM migrations for production schema changes
- Consider using a separate seeding strategy for production data
