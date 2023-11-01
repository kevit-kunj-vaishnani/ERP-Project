import {Schema, model} from 'mongoose';

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  initials: {
    type: String,
    required: true,
    unique: true
  },

  availableSeats: {
    type: Number,
    required: true
  },

  occupiedSeats: {
    type: Number,
    default: 0
  }
});

export const Department = model('Department', departmentSchema);
