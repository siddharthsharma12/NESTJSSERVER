import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caretaker } from './caretaker.entity';
import { CreateCaretakerDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';

@Injectable()
export class CaretakerService {
  constructor(
    @InjectRepository(Caretaker)
    private caretakerRepository: Repository<Caretaker>,
  ) {}


  async create(createCaretakerDto: CreateCaretakerDto): Promise<Caretaker> {
    const caretaker = this.caretakerRepository.create(createCaretakerDto);
    return await this.caretakerRepository.save(caretaker);
  }

  
  async findAll(): Promise<Caretaker[]> {
    return await this.caretakerRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  
  async findOne(id: number): Promise<Caretaker> {
    const caretaker = await this.caretakerRepository.findOne({ where: { id } });
    if (!caretaker) {
      throw new NotFoundException(`Caretaker with ID ${id} not found`);
    }
    return caretaker;
  }

  
  async update(id: number, updateCaretakerDto: UpdateCaretakerDto): Promise<Caretaker> {
    const caretaker = await this.findOne(id);
    Object.assign(caretaker, updateCaretakerDto);
    return await this.caretakerRepository.save(caretaker);
  }

  
  async remove(id: number): Promise<void> {
    const caretaker = await this.findOne(id);
    await this.caretakerRepository.remove(caretaker);
  }

}
