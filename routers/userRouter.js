import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

// Seed Users From Data.js

userRouter.get(
    '/seed', 
    expressAsyncHandler(async (req, res) => {
        // Remove All Users
        await User.deleteMany({});

        // Create Users ( SEED ) from data.js 
        const createdUsers = await User.insertMany(data.users);

        // Display Created Users
        res.send({ createdUsers });
    })
);

// Signin

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    rule: user.rule,
                    photo: user.photo,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({message: 'Invalid email or password'});
    })
);

// Register

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            rule: 'client',
        });

        const createdUser = await user.save();

        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            rule: createdUser.rule,
            photo: createdUser.photo,
            token: generateToken(createdUser),
        });
    })
) 
export default userRouter;