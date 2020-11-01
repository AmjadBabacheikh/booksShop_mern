import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connection to database on ${con.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
