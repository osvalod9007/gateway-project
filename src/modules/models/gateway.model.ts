import { model, Schema } from 'mongoose';
import { IGateway } from '../interfaces/gateway.interface';

const GatewaySchema: Schema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ipv4: {
    type: String,
    required: true,
  },
  peripherals: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const Gateway = model<IGateway>('gateway', GatewaySchema);
export default Gateway;
