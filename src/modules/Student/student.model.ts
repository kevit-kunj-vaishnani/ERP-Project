import {NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import {Schema, model} from 'mongoose';
import {Roles} from '../../interfaces';

const studentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: Number,
    required: true
  },

  departmentId: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true
    // ref: ''
  },

  role: {
    type: String,
    default: Roles.STUDENT
  },

  authToken: {
    type: String
  },

  sem: {
    type: Number,
    required: true
  }
});

studentSchema.pre('save', async function (next: NextFunction) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});
export const Student = model('Student', studentSchema);
