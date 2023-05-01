import mongoose from 'mongoose';
import { getDbUrl } from '../helpers/helpers';

const connectDB = async () => {
  const DbUrl = getDbUrl();

  try {
    const conn = await mongoose.connect(DbUrl);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
