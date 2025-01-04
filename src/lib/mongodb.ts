import mongoose from 'mongoose';
import { DB_CONFIG } from './config/db.config';

class Database {
  private static instance: Database;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      await mongoose.connect(DB_CONFIG.uri);
      this.isConnected = true;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
}

export const db = Database.getInstance();
export const connectDB = () => db.connect();