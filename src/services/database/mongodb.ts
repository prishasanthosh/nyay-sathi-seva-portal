
import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nyay_sathi';

// MongoDB client instance
let dbClient: MongoClient | null = null;
let db: Db | null = null;

/**
 * Connects to MongoDB using the MongoDB driver
 */
export const connectToMongoDB = async (): Promise<Db> => {
  try {
    if (db) {
      console.log('Using existing database connection');
      return db;
    }

    console.log('Connecting to MongoDB...');
    dbClient = await MongoClient.connect(MONGODB_URI);
    db = dbClient.db();
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

/**
 * Connects to MongoDB using Mongoose ODM
 */
export const connectToMongooseDB = async (): Promise<typeof mongoose> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing Mongoose connection');
      return mongoose;
    }

    console.log('Connecting to MongoDB with Mongoose...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB with Mongoose successfully');
    return mongoose;
  } catch (error) {
    console.error('Mongoose connection error:', error);
    throw new Error('Failed to connect to MongoDB with Mongoose');
  }
};

/**
 * Closes the MongoDB connection
 */
export const closeMongoDB = async (): Promise<void> => {
  if (dbClient) {
    await dbClient.close();
    dbClient = null;
    db = null;
    console.log('MongoDB connection closed');
  }
};

/**
 * Closes the Mongoose connection
 */
export const closeMongooseDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('Mongoose connection closed');
  }
};
