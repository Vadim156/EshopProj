import express from 'express';
import User from '../models/userModel.js';
import expressAsyncHandler from 'expressAsyncHandler';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid Password/User' });
  })
);

// userRouter.get('/token/:token', async (req, res) => {
//   const user = await User.findOne({ token: req.params.token });

//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send({ message: 'user not found' });
//   }
// });
// userRouter.get('/:id', async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send({ message: 'user not found' });
//   }
// });
// userRouter.get('/', async (req, res) => {
//   const users = await User.find();
//   res.send(users);
// });

export default userRouter;
