import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import * as dotenv from 'dotenv';
import * as compression from 'compression';
import * as zlib from 'zlib';
import 'cors';
import * as bodyParser from 'body-parser';

import connectDB from './database/db';
import { PeripheralController } from './modules/controllers/peripheral.controller';
import { GatewayController } from './modules/controllers/gateway.controller';

/**
 * Add configuration file .env to process.env
 */
dotenv.config({ path: '.env' });

/**
 * Connect Database
 */
connectDB(process.env.NONGO_URI);

/**
 * Configuration Server
 */
export const app = createExpressServer({
  cors: true,
  routePrefix: '/api',
  controllers: [PeripheralController, GatewayController],
  middlewares: [],
});

/**
 * 3rd party libraries
 */
app.use(
  compression({
    level: zlib.constants.Z_BEST_COMPRESSION,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.disable('x-powered-by');

/**
 * Init Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
