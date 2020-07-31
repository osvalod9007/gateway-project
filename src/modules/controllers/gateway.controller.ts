import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Req,
  Res,
} from 'routing-controllers';
import Gateway from '../models/gateway.model';
import { CreateGatewayDto, GetGatewayDto } from '../dtos/gateway.dto';
import { Request, Response } from 'express';
import Peripheral from '../models/peripheral.model';
import { CreatePeripheralDto } from '../dtos/peripheral.dto';

@JsonController('/gateway')
export class GatewayController {
  private gatewayModel = Gateway;
  private peripheralModel = Peripheral;

  @Post()
  async Create(
    @Body({ validate: true }) gatewayDto: CreateGatewayDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const { serialNumber } = gatewayDto;
      const gateway = await this.gatewayModel.findOne({ serialNumber });
      if (gateway) {
        return res
          .status(403)
          .json({ errors: [{ message: 'Gateway already exists' }] });
      }

      if (gatewayDto.peripherals.length > 10) {
        return res.status(403).json({
          errors: [{ message: 'The gateway only allows up to 10 peripherals' }],
        });
      }
      for (const i in gatewayDto.peripherals) {
        let peripheralExist = await this.peripheralModel.findOne({
          uid: gatewayDto.peripherals[i].uid,
        });
        if (!peripheralExist) {
          peripheralExist = new this.peripheralModel(gatewayDto.peripherals[i]);
          await peripheralExist.save();
          const peripheralTemp = await this.peripheralModel.findOne({
            uid: gatewayDto.peripherals[i].uid,
          });
          gatewayDto.peripherals[i] = peripheralTemp;
        }
        gatewayDto.peripherals[i] = peripheralExist;
      }
      const newGateway = new this.gatewayModel(gatewayDto);
      await newGateway.save();
      const gatewayCreated = await this.gatewayModel.findOne({
        serialNumber: newGateway.serialNumber,
      });
      const peripherals: CreatePeripheralDto[] = [];
      for (const peripheral in gatewayCreated.peripherals) {
        peripherals[peripheral] = await this.peripheralModel
          .findById(gatewayCreated.peripherals[peripheral])
          .select('-__v');
      }
      const gatewayJson: GetGatewayDto = {
        _id: gatewayCreated._id,
        serialNumber: gatewayCreated.serialNumber,
        name: gatewayCreated.name,
        ipv4: gatewayCreated.ipv4,
        peripherals,
      };
      return res.status(201).json(gatewayJson);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  @Post('/setPeripheral/:gatewayId')
  async addPeripheralToGateway(
    @Param('gatewayId') gatewayId: string,
    @Body({ validate: true }) peripheralDto: CreatePeripheralDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const gateway = await this.gatewayModel.findById(gatewayId);
      if (!gateway) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }

      if (gateway.peripherals.length === 10) {
        return res.status(403).json({
          errors: [
            {
              message: 'The Gateway is full, only allows up to 10 peripherals',
            },
          ],
        });
      }
      let peripheralExist = await this.peripheralModel.findOne({
        uid: peripheralDto.uid,
      });

      const peripheralGateway: CreatePeripheralDto[] = [];
      for (const index in gateway.peripherals) {
        peripheralGateway[index] = await this.peripheralModel.findById(
          gateway.peripherals[index]
        );
      }
      const existsPeripheralInGateway = peripheralGateway.find(
        (peripheral) => peripheral.uid === peripheralDto.uid
      );

      if (existsPeripheralInGateway) {
        return res
          .status(403)
          .json({
            errors: [
              { message: 'The Peripheral already exist at the Gateway' },
            ],
          });
      }

      if (!peripheralExist) {
        peripheralExist = new this.peripheralModel(peripheralDto);
        await peripheralExist.save();
        const peripheralTemp = await this.peripheralModel.findOne({
          uid: peripheralDto.uid,
        });
        gateway.peripherals.unshift(peripheralTemp._id);
      } else {
        gateway.peripherals.unshift(peripheralExist._id);
      }

      await gateway.save();

      const gatewayCreated = await this.gatewayModel.findOne({
        serialNumber: gateway.serialNumber,
      });
      const peripherals: CreatePeripheralDto[] = [];
      for (const peripheral in gatewayCreated.peripherals) {
        peripherals[peripheral] = await this.peripheralModel
          .findById(gatewayCreated.peripherals[peripheral])
          .select('-__v');
      }
      const gatewayJson: GetGatewayDto = {
        _id: gatewayCreated._id,
        serialNumber: gatewayCreated.serialNumber,
        name: gatewayCreated.name,
        ipv4: gatewayCreated.ipv4,
        peripherals,
      };
      return res.status(201).json(gatewayJson);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  @Put('/:id')
  async addPeripherals(
    @Param('id') id: string,
    @Body({ validate: true }) gatewayDto: CreateGatewayDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const gateway: CreateGatewayDto = await this.gatewayModel.findById(id);
      if (!gateway) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }
      if (gatewayDto.peripherals.length > 10) {
        return res.status(403).json({
          errors: [{ message: 'The gateway only allows up to 10 peripherals' }],
        });
      }
      for (const i in gatewayDto.peripherals) {
        let peripheralExist = await this.peripheralModel.findOne({
          uid: gatewayDto.peripherals[i].uid,
        });
        if (!peripheralExist) {
          peripheralExist = new this.peripheralModel(gatewayDto.peripherals[i]);
          await peripheralExist.save();
          const peripheralTemp = await this.peripheralModel.findOne({
            uid: gatewayDto.peripherals[i].uid,
          });
          gatewayDto.peripherals[i] = peripheralTemp;
        }
        gatewayDto.peripherals[i] = peripheralExist;
      }
      await this.gatewayModel.findByIdAndUpdate(id, gatewayDto);
      const gatewayUpdated = await this.gatewayModel.findById(id);
      const peripherals: CreatePeripheralDto[] = [];
      for (const peripheral in gatewayUpdated.peripherals) {
        peripherals[peripheral] = await this.peripheralModel
          .findById(gatewayUpdated.peripherals[peripheral])
          .select('-__v');
      }
      const gatewayJson: GetGatewayDto = {
        _id: id,
        serialNumber: gatewayUpdated.serialNumber,
        name: gatewayUpdated.name,
        ipv4: gatewayUpdated.ipv4,
        peripherals,
      };

      return res.status(200).json(gatewayJson);
    } catch (err) {}
  }

  @Delete('/deletePeripheral/:gatewayId/:peripheralId')
  async deletePeripheralInGateway(
    @Param('gatewayId') gatewayId: string,
    @Param('peripheralId') peripheralId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const gateway = await this.gatewayModel.findById(gatewayId);
      if (!gateway) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }
      const peripheral = await this.peripheralModel.findById(peripheralId);
      if (!peripheral) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Peripheral not found' }] });
      }

      const index = gateway.peripherals.indexOf(peripheral);
      gateway.peripherals.splice(index, 1);
      console.log(gateway.peripherals);
      await gateway.save();
      const gatewayCreated = await this.gatewayModel.findOne({
        serialNumber: gateway.serialNumber,
      });
      const peripherals: CreatePeripheralDto[] = [];
      for (const peripheral in gatewayCreated.peripherals) {
        peripherals[peripheral] = await this.peripheralModel
          .findById(gatewayCreated.peripherals[peripheral])
          .select('-__v');
      }
      const gatewayJson: GetGatewayDto = {
        _id: gatewayCreated._id,
        serialNumber: gatewayCreated.serialNumber,
        name: gatewayCreated.name,
        ipv4: gatewayCreated.ipv4,
        peripherals,
      };
      return res.status(201).json(gatewayJson);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const gateway: CreateGatewayDto = await this.gatewayModel.findById(id);
      if (!gateway) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }
      const peripherals: CreatePeripheralDto[] = [];
      for (const peripheral in gateway.peripherals) {
        peripherals[peripheral] = await this.peripheralModel
          .findById(gateway.peripherals[peripheral])
          .select('-__v');
      }
      const gatewayJson: GetGatewayDto = {
        _id: id,
        serialNumber: gateway.serialNumber,
        name: gateway.name,
        ipv4: gateway.ipv4,
        peripherals,
      };
      return res.status(200).json(gatewayJson);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const gateways = await this.gatewayModel.find();
      const gatewaysJson: GetGatewayDto[] = [];
      for (const gateway in gateways) {
        const peripherals: CreatePeripheralDto[] = [];
        for (const peripheral in gateways[gateway].peripherals) {
          peripherals[peripheral] = await this.peripheralModel
            .findById(gateways[gateway].peripherals[peripheral])
            .select('-__v');
        }
        gatewaysJson.unshift({
          _id: gateways[gateway]._id,
          serialNumber: gateways[gateway].serialNumber,
          name: gateways[gateway].name,
          ipv4: gateways[gateway].ipv4,
          peripherals,
        });
      }
      return res.status(200).json(gatewaysJson);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
}
