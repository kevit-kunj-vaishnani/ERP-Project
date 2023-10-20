import mongoose, {Schema} from 'mongoose';

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
    trim: true,
    required: true
  },

  phone: {
    type: Number,
    required: true
  },

  designation: {
    type: String,
    trim: true,
    required: true
  },

  department: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true
  },

  isAdmin: {
    type: Boolean,
    required: true
  },

  authToken: {
    type: String
  }
});

export const User = mongoose.model('User', userSchema); // User is a model name , userSchema is mongoose schema name
