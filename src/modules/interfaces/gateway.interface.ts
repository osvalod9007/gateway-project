import { Document } from 'mongoose';
import { CreatePeripheralDto } from '../dtos/peripheral.dto';

export interface IGateway extends Document {
  readonly serialNumber: string;
  readonly name: string;
  readonly ipv4: string;
  readonly peripherals: CreatePeripheralDto[];
}
