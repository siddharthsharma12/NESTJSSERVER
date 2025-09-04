import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CaretakerSeeder } from './caretaker/caretaker.seeder';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(private caretakerSeeder: CaretakerSeeder) {}

  async onApplicationBootstrap() {
    console.log('Initializing database...');
    await this.caretakerSeeder.seed();
    console.log('Database initialization completed');
  }
}
