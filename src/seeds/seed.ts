import Gateway from '../modules/models/gateway.model';
import Peripheral from '../modules/models/peripheral.model';

export default () => {
  const seeds = async () => {
    await Peripheral.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Peripheral({
          uid: 1,
          vendor: 'Osvaldo Lopez',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 1 to peripherals collection');
        });

        new Peripheral({
          uid: 2,
          vendor: 'John Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 2 to peripherals collection');
        });

        new Peripheral({
          uid: 3,
          vendor: 'Jennifer Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 3 to peripherals collection');
        });

        new Peripheral({
          uid: 4,
          vendor: 'Roxana Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 4 to peripherals collection');
        });

        new Peripheral({
          uid: 5,
          vendor: 'Roland Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 5 to peripherals collection');
        });

        new Peripheral({
          uid: 6,
          vendor: 'Pepe Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 6 to peripherals collection');
        });

        new Peripheral({
          uid: 7,
          vendor: 'Jose Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 7 to peripherals collection');
        });

        new Peripheral({
          uid: 8,
          vendor: 'Lucas Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 8 to peripherals collection');
        });

        new Peripheral({
          uid: 9,
          vendor: 'Robert Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 9 to peripherals collection');
        });

        new Peripheral({
          uid: 10,
          vendor: 'Alicia Doe',
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Peripheral 10 to peripherals collection');
        });
      }
    });
    const peripheralIds = await Peripheral.find().select('_id');

    await Gateway.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Gateway({
          serialNumber: 'serialNumber1',
          name: 'gw1',
          ipv4: '0.0.0.0',
          peripherals: [peripheralIds[1]._id, peripheralIds[2]._id],
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Gateway gw1 to gateways collection');
        });

        new Gateway({
          serialNumber: 'serialNumber2',
          name: '.net',
          ipv4: '192.168.0.0',
          peripherals: [
            peripheralIds[1]._id,
            peripheralIds[2]._id,
            peripheralIds[3]._id,
            peripheralIds[4]._id,
            peripheralIds[5]._id,
            peripheralIds[6]._id,
          ],
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Gateway .net to gateways collection');
        });

        new Gateway({
          serialNumber: 'serialNumber3',
          name: 'fireWorld',
          ipv4: '1.1.1.1',
          peripherals: [peripheralIds[1]._id, peripheralIds[2]._id],
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Gateway fireWorld to gateways collection');
        });

        new Gateway({
          serialNumber: 'serialNumber4',
          name: 'aicros',
          ipv4: '255.255.255.1',
          peripherals: [peripheralIds[3]._id, peripheralIds[9]._id],
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Gateway aicros to gateways collection');
        });

        new Gateway({
          serialNumber: 'serialNumber5',
          name: 'msi',
          ipv4: '192.168.1.6',
          peripherals: [
            peripheralIds[0]._id,
            peripheralIds[1]._id,
            peripheralIds[2]._id,
            peripheralIds[3]._id,
            peripheralIds[4]._id,
            peripheralIds[5]._id,
            peripheralIds[6]._id,
            peripheralIds[7]._id,
            peripheralIds[8]._id,
            peripheralIds[9]._id,
          ],
        }).save((err) => {
          if (err) console.log('error', err);
          console.log('Added Gateway msi to gateways collection');
        });
      }
    });
  };
  seeds();
};
