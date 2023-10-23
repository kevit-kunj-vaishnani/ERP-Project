import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

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

  isAdmin: {
    type: Boolean,
    required: true
  },

  authToken: {
    type: String
  }
});

// for making password a hashpassword. this will be done when we create new user and update user
// save is in-built method . so when we will call save method in routes user it will do what we have defined here + what it is originally used for
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

export const User = mongoose.model('User', userSchema); // User is a model name , userSchema is mongoose schema name
