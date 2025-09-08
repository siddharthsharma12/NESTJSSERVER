import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CaretakerService } from './caretaker.service';
import { CreateCaretakerDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';
import { QueryCaretakerDto } from './dto/query-caretaker.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('caretakers')
@UseGuards(JwtAuthGuard)
export class CaretakerController {
  constructor(private readonly caretakerService: CaretakerService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCaretakerDto: CreateCaretakerDto) {
    return this.caretakerService.create(createCaretakerDto);
  }

  
  @Get()
  findAll(@Query() queryDto: QueryCaretakerDto) {
    return this.caretakerService.findAll(queryDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caretakerService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaretakerDto: UpdateCaretakerDto) {
    return this.caretakerService.update(+id, updateCaretakerDto);
  }

  
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.caretakerService.remove(+id);
  }
}
