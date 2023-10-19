import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'reguler'
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
