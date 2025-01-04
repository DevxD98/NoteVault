import { Schema, model, models } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model exists before creating a new one
export const UserModel = models.User || model<IUser>('User', userSchema);