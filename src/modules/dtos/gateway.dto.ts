import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreatePeripheralDto } from './peripheral.dto';

export class CreateGatewayDto {
  @IsString()
  @IsNotEmpty()
  readonly serialNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    { message: 'Weak IPv4' }
  )
  readonly ipv4: string;

  peripherals: CreatePeripheralDto[];
}

export class GetGatewayDto {
  @IsString()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  readonly serialNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    { message: 'Weak IPv4' }
  )
  readonly ipv4: string;

  peripherals: CreatePeripheralDto[];
}
