import mongoose from 'mongoose';

const connectDB = async () => {
  const DbUrl =
    process.env.DB_URL ||
    'mongodb+srv://AhmedDev:Dev122022@atlascluster.kcaj75a.mongodb.net/?retryWrites=true&w=majority';
  try {
    const conn = await mongoose.connect(DbUrl);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
