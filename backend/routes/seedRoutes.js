import express from 'express';
import Product from '../models/product.Model.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createProducts = await Product.insertMany(data.products);
  res.send({ createProducts });
  // await Product.deleteMany({});
  // const createProducts = await Product.insertMany(data.products)
});

export default seedRouter;
