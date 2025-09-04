import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caretaker } from './caretaker.entity';

@Injectable()
export class CaretakerSeeder {
  constructor(
    @InjectRepository(Caretaker)
    private caretakerRepository: Repository<Caretaker>,
  ) {}

  async seed(): Promise<void> {
    
    const existingCaretakers = await this.caretakerRepository.count();
    if (existingCaretakers > 0) {
      console.log('Caretakers already exist, skipping seed');
      return;
    }

    const sampleCaretakers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        address: '123 Main St, City, State',
        qualifications: 'Nursing Degree',
        experience: '5 years in elderly care',
        hourlyRate: 25.50,
        isActive: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1234567891',
        address: '456 Oak Ave, City, State',
        qualifications: 'Certified Nursing Assistant',
        experience: '3 years in home care',
        hourlyRate: 22.00,
        isActive: true,
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1234567892',
        address: '789 Pine Rd, City, State',
        qualifications: 'Registered Nurse',
        experience: '8 years in healthcare',
        hourlyRate: 30.00,
        isActive: true,
      },
    ];

    try {
      await this.caretakerRepository.save(sampleCaretakers);
      console.log('Sample caretakers seeded successfully');
    } catch (error) {
      console.error('Error seeding caretakers:', error);
    }
  }
}
