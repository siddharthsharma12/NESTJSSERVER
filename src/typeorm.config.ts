import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: 'config.env' });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: parseInt(configService.get('DB_PORT')) || 5432,
  username: configService.get('DB_USERNAME') || 'postgres',
  password: configService.get('DB_PASSWORD') || 'password',
  database: configService.get('DB_NAME') || 'caretaker_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: configService.get('NODE_ENV') !== 'production',
});
