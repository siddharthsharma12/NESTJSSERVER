export class CreateCaretakerDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
  qualifications?: string;
  experience?: string;
  hourlyRate?: number;
}
