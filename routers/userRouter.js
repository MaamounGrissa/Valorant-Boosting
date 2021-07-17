import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import path from 'path';
import Account from '../models/accountModel.js';
import Order from '../models/orderModel.js';

const __dirname = path.dirname(import.meta.url).replace(/^file:\/\/\//, '');
const userRouter = express.Router();

// GET ALL USERS

userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
}));


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

        const account = new Account({
            userId: createdUser._id,
            name: '',
            password: '',
            summoner: '',
        });

        account.save();

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

// Add Booster

userRouter.post(
    '/addbooster',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            rule: 'booster',
            rank: req.body.rank ? req.body.rank : null,
            paypal: req.body.paypal ? req.body.paypal : null,
            percentage: req.body.percentage ? req.body.percentage : null,
        });

        user.save( function (err) {
            if (err) {
              if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                return res.status(422).send({ succes: false, message: 'User already exist!' });
              }
              // Some other error
              return res.status(422).send(err);
            }
        });

        const account = new Account({
            userId: user._id,
            name: '',
            password: '',
            summoner: ''
        });

        account.save();

        res.send('Booster Added')

           
    })
)

// Edit Booster

userRouter.post(
    '/editbooster',
    expressAsyncHandler(async (req, res) => {

        const user = await User.findById(req.body.id);

        if (!user) {
            return res.send([null, 'User not found !']);
        }

        user.name = req.body.name;
        req.body.password !== '' && ( user.password = bcrypt.hashSync(req.body.password, 8) );
        user.rak = req.body.rank;
        user.paypal = req.body.paypal;
        user.percentage = req.body.percentage;

        await user.save();

        res.send('Booster Updated');
    })
)

// DELETE Booster

userRouter.delete('/:id', expressAsyncHandler(async (req, res) => {

    await User.deleteOne({ _id: req.params.id }, 
        function (err) {
            if (err) {
                return res.status(500).send(err);
            }
    });

    await Order.updateMany({ boosterId : req.params.id}, { boosterId : '', status : 'Looking for a booster' });
    /* if (orders) {
        orders.forEach(order => {
            order.boosterId = '';
            order.status = 'Looking for a booster';
        });
        orders.u();
    } */
    res.send('Booster Deleted');

}));

// getmyprofile

userRouter.post('/getmyprofile', expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({_id: req.body.id})
        res.send(user);
    })
)

// Profile Edit

userRouter.post('/edit', expressAsyncHandler(async (req, res) => {
   
        const user = await User.findById(req.body.id);
        var photoFile= '', photoFilename = '';

        if (!user) {
            return res.send([null, 'User not found !']);
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {

            // Upload File 1 if new image selected
            if (req.files && req.files.photo) {
                photoFile = req.files.photo;
                photoFilename = Date.now() + '-' + photoFile.name;
                photoFile.mv(path.join(__dirname + './../frontend/public/images', 'users/') + photoFilename, err => {
                    if(err) {
                        return res.status(500).send(err);
                    }
                });
                photoFile = '/images/users/' + photoFilename;
            } else {
                photoFile = user.photo;
            }

            user.name = req.body.name;
            photoFile !== '' && ( user.photo = photoFile );
            req.body.newPassword !== '' && ( user.password = bcrypt.hashSync(req.body.password, 8) );
            // return res.status(404).send(user);
            await user.save()

            // return res.status(404).send(data);
            // Return User
            res.send([{
                _id: user._id,
                name: user.name,
                email: user.email,
                rule: user.rule,
                photo: user.photo,
                token: generateToken(user),
            }, 'Profile Updated']);  
        } else {
            res.send([null, 'Old Password Error']);
        }
    })
) 
export default userRouter;