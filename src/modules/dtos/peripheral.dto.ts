import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePeripheralDto {
  @IsNumber()
  @IsNotEmpty()
  readonly uid: number;

  @IsString()
  @IsNotEmpty()
  readonly vendor: string;

  readonly status: boolean;
}
