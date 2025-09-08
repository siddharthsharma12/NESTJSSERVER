import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Caretaker } from './caretaker.entity';
import { CreateCaretakerDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';
import { QueryCaretakerDto } from './dto/query-caretaker.dto';

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

  
  async findAll(queryDto: QueryCaretakerDto): Promise<{ data: Caretaker[]; total: number; page: number; limit: number; totalPages: number }> {
    const { 
      search, 
      firstName, 
      lastName, 
      email, 
      isActive, 
      minHourlyRate, 
      maxHourlyRate, 
      page, 
      limit, 
      sortBy, 
      sortOrder 
    } = queryDto;

    const queryBuilder: SelectQueryBuilder<Caretaker> = this.caretakerRepository.createQueryBuilder('caretaker');

    // Search functionality
    if (search) {
      queryBuilder.andWhere(
        '(caretaker.firstName ILIKE :search OR caretaker.lastName ILIKE :search OR caretaker.email ILIKE :search OR caretaker.qualifications ILIKE :search OR caretaker.experience ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Filters
    if (firstName) {
      queryBuilder.andWhere('caretaker.firstName ILIKE :firstName', { firstName: `%${firstName}%` });
    }

    if (lastName) {
      queryBuilder.andWhere('caretaker.lastName ILIKE :lastName', { lastName: `%${lastName}%` });
    }

    if (email) {
      queryBuilder.andWhere('caretaker.email ILIKE :email', { email: `%${email}%` });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('caretaker.isActive = :isActive', { isActive });
    }

    if (minHourlyRate !== undefined) {
      queryBuilder.andWhere('caretaker.hourlyRate >= :minHourlyRate', { minHourlyRate });
    }

    if (maxHourlyRate !== undefined) {
      queryBuilder.andWhere('caretaker.hourlyRate <= :maxHourlyRate', { maxHourlyRate });
    }

    // Sorting
    const allowedSortFields = ['firstName', 'lastName', 'email', 'createdAt', 'hourlyRate'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    queryBuilder.orderBy(`caretaker.${sortField}`, sortOrder);

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
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
