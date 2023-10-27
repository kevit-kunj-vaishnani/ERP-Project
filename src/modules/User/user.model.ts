import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import {Roles} from '../../interfaces';

const userSchema = new mongoose.Schema({
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

  designation: {
    type: String,
    required: true
  },

  department: {
    type: String,
    trim: true,
    required: true
    // ref: ''
  },

  role: {
    type: String,
    required: true
  },

  authToken: {
    type: String
  }
});

// for making password a hashpassword. this will be done when we create new user and update user
// save is in-built method . so when we will call save method in routes user it will do what we have defined here + what it is originally used for
// here we have to use normal function instead of arrow function because this does not bind with this keyword
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    switch (this.role) {
      case 'ADMIN':
        this.role = Roles.ADMIN;
        break;

      case 'STAFF':
        this.role = Roles.STAFF;
        break;

      default:
        break;
    }

    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model('User', userSchema); // User is a model name , userSchema is mongoose schema name
