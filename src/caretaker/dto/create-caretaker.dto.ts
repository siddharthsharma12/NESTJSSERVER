import { IsString, IsEmail, IsOptional, IsDateString, IsNumber, IsPositive, Length, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateCaretakerDto {
  @IsString()
  @Length(2, 100)
  firstName: string;

  @IsString()
  @Length(2, 100)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  address?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  @MinLength(10)
  qualifications?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  experience?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  hourlyRate?: number;
}
