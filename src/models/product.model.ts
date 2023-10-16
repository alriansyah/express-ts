import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  size: {
    type: String
  }
});

const productModel = mongoose.model('product', productSchema);

export default productModel;
