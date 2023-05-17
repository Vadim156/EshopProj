import express from 'express';
import data from './data.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { get } from 'mongoose';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use('/api/v1/seed', seedRouter);

app.get('/api/v1/product/token/:token', (req, res) => {
  const product = data.products.find((x) => x.token === req.params.token);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});
app.get('/api/v1/product/:_id', (req, res) => {
  const product = data.products.find((x) => x._id == req.params._id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});
app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongoDB!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`failed to connect to mongoDB!: ${err.message}`);
  });
