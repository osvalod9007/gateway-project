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
import { CreatePeripheralDto } from '../dtos/peripheral.dto';
import Peripheral from '../models/peripheral.model';
import { Request, Response } from 'express';

@JsonController('/peripheral')
export class PeripheralController {
  private peripheralModel = Peripheral;

  @Post()
  async post(
    @Body({ validate: true }) peripheralDto: CreatePeripheralDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      let peripheral = await this.peripheralModel.findOne({
        uid: peripheralDto.uid,
      });
      if (peripheral) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Peripheral already exists' }] });
      }
      peripheral = new this.peripheralModel(peripheralDto);
      await peripheral.save();
      return res.status(200).json(peripheral);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() peripheralDto: CreatePeripheralDto,
    @Res() res: Response
  ) {
    try {
      let peripheral = await this.peripheralModel.findById(id).select('-__v');
      if (!peripheral) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }
      await this.peripheralModel.findByIdAndUpdate(id, peripheralDto);
      peripheral = await this.peripheralModel.findById(id).select('-__v');

      res.status(200).json(peripheral);
      return res.status(200).json(peripheral);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const peripheral = await this.peripheralModel.findById(id).select('-__v');
      if (!peripheral) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }
      await this.peripheralModel.findByIdAndDelete(id);
      res.status(200).json({ message: `Peripheral removed` });
      return res.status(200).json(peripheral);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const peripherals = await this.peripheralModel
        .find()
        .select('-__v')
        .sort({ created: -1 });
      return res.status(200).json(peripherals);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const peripheral = await this.peripheralModel.findById(id).select('-__v');
      if (!peripheral) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Gateway not found' }] });
      }
      return res.status(200).json(peripheral);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
}
