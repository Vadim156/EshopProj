import express from 'express';
import Product from '../models/product.Model.js';

const productRouter = express.Router();

productRouter.get('/token/:token', async (req, res) => {
  const product = await Product.findOne({ token: req.params.token });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

export default productRouter;
