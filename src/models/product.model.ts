import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      unique: true
    },
    price: {
      type: Number
    },
    size: {
      type: String
    }
  },
  { timestamps: true }
);

const productModel = mongoose.model('product', productSchema);

export default productModel;
