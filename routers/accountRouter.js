import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Account from '../models/accountModel.js';
import data from '../data.js';

const accountRouter = express.Router();

// GET ALL Accounts

accountRouter.get('/', expressAsyncHandler(async (req, res) => {
    const myAccounts = await Account.find({});
    res.send(myAccounts);
}));

// GET MY Account

accountRouter.post('/getmyaccount', expressAsyncHandler(async (req, res) => {
    const myAccounts = await Account.findOne({ userId : req.body.id });
    res.send(myAccounts);
}));

// Seed Account From Data.js

accountRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // Remove All Account
    await Account.deleteMany({});

    // Create Account ( SEED ) from data.js 
    const createdAccounts = await Account.insertMany(data.accounts);

    // Display Created Account
    res.send({ createdAccounts });
})
);

// Add Accounb

accountRouter.post( '/add', expressAsyncHandler(async (req, res) => {
        
    const account = new Account({
           userId: req.body.userId,
           orderId: req.body.orderId,
           message: req.body.message,
        });
        
    await account.save();
    res.send('Message sent !');
}));

// Edit Account if exist or create new

accountRouter.post( '/edit', expressAsyncHandler(async (req, res) => {

    const account = await Account.findOne({userId : req.body.userId});

    if (account) {
        account.name = req.body.name ? req.body.name : '';
        account.password = req.body.password ? req.body.password : '';
        account.summoner = req.body.summoner ? req.body.summoner : '';
    } else {
        account = new Account({
            userId: req.body.userId,
            orderId: req.body.orderId,
            message: req.body.message,
         });
    }

    await account.save();
    
    res.send('Account Saved !');
}));



export default accountRouter;

