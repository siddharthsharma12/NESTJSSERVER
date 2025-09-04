import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CaretakerModule } from './caretaker/caretaker.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.env',
    }),
    

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'caretaker_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in development
      logging: process.env.NODE_ENV !== 'production',
    }),
    
    CaretakerModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
