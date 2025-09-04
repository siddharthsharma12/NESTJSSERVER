import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaretakerService } from './caretaker.service';
import { CaretakerController } from './caretaker.controller';
import { Caretaker } from './caretaker.entity';
import { CaretakerSeeder } from './caretaker.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Caretaker])],
  controllers: [CaretakerController],
  providers: [CaretakerService, CaretakerSeeder],
  exports: [CaretakerService, CaretakerSeeder],
})
export class CaretakerModule {}
