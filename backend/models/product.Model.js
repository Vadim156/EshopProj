import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    token: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    countInStock: { type: Number, required: true },
    // rating: {
    //   rate: { type: Number, required: false },
    // },
    // numReviews: { type: Number, required: true },
    image: { type: String, required: true },
  },

  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
