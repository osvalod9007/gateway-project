import { model, Schema } from 'mongoose';
import { IPeripheral } from '../interfaces/peripheral .interface';

const PeripheralSchema: Schema = new Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Peripheral = model<IPeripheral>('peripheral', PeripheralSchema);
export default Peripheral;
