import * as mongoose from 'mongoose';
import seeds from '../seeds/seed';

export default (db: string) => {
  const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      seeds();
      return console.log(`Successfully connected to ${db}`);
    } catch (err) {
      console.error('Error connecting to database: ', err.message);
      // Exit process with failure
      return process.exit(1);
    }
  };
  connectDB();

  mongoose.connection.on('disconnected', connectDB);
};
