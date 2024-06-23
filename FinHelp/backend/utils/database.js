import mongoose from 'mongoose';


const url = process.env.MONGODB_URL || 'mongodb+srv://patitejash:Fd4cB7EoKmChSAMR@cluster0.scsp3x6.mongodb.net/';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const databaseConnection = async () => {
  try {
    await mongoose.connect(url, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};