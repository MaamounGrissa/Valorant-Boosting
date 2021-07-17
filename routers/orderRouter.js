import express from 'express';
import dateFormat from 'dateformat';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import Order from '../models/orderModel.js';
import Account from '../models/accountModel.js';

const orderRouter = express.Router();

// GET ALL Orders

orderRouter.get('/', expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
}));

// GET My List Orders

orderRouter.post('/mylistorders', expressAsyncHandler(async (req, res) => {
    const myOrders = await Order.find({userId: req.body.id});
    res.send(myOrders);
}));


// Seed Orders From Data.js

orderRouter.get('/seed', expressAsyncHandler(async (req, res) => {
        // Remove All Orders
        await Order.deleteMany({});

        // Create Orders ( SEED ) from data.js 
        const createdOrders = await Order.insertMany(data.orders);

        // Display Created Orders
        res.send({ createdOrders });
    })
);

// Add Order

orderRouter.post( '/add', expressAsyncHandler(async (req, res) => {

    const now = Date.now();
       
    const order = new Order({
        status: 'Looking for a booster',
        userId: req.body.userid,
        server: req.body.server,
        boostType: req.body.type,
        startRank: req.body.startrank || 0,
        startDivision: req.body.startdivision || 0,
        rankRating: req.body.rankrating || 0,
        desiredRank: req.body.desiredrank,
        desiredDivision: req.body.desireddivision,
        games: req.body.games || 0,
        duoGame:  req.body.duogame,
        chatOffine: req.body.chatoffline,
        specificAgents: req.body.specificagents,
        priorityOrder: req.body.priorityorder,
        withStreaming: req.body.withstreaming,
        price: req.body.price,
        payement: req.body.payement || false,
        isPaused: false,
    });

    await order.save();

    const  account = await Account.findOne({ userId : req.body.userid });

    if (account) {
        if(!req.body.payement) {
            account.name = req.body.account;
            account.password = req.body.password;
            account.summoner = req.body.summoner;
            await account.save();
        }
    } else {
        createdAccount = new Account({
            userId: req.body.userid,
            name : req.body.account,
            password : req.body.password,
            summoner : req.body.summoner,
        });
        await createdAccount.save();
    }

    const chat = new Chat({
        userId: req.body.userid,
        orderId: order._id,
        message: 'Chat created at ' + dateFormat(now, "dd/mm/yyyy"),
    });

    await chat.save();

    res.send('Order Added');
    })
);

// Add Order from front

orderRouter.post( '/addneworder', expressAsyncHandler(async (req, res) => {

    const now = Date.now();

    const order = new Order({
        status: 'Looking for a booster',
        userId: req.body.myOrder.userid,
        server: req.body.myOrder.server,
        boostType: req.body.myOrder.type,
        startRank: req.body.myOrder.startrank || 0,
        startDivision: req.body.myOrder.startdivision || 0,
        rankRating: req.body.myOrder.rankrating || 0,
        desiredRank: req.body.myOrder.desiredrank,
        desiredDivision: req.body.myOrder.desireddivision,
        games: req.body.myOrder.games || 0,
        duoGame:  req.body.myOrder.duogame,
        chatOffine: req.body.myOrder.chatoffline,
        specificAgents: req.body.myOrder.specificagents,
        priorityOrder: req.body.myOrder.priorityorder,
        withStreaming: req.body.myOrder.withstreaming,
        price: req.body.myOrder.price,
        payement: req.body.myOrder.payement || false,
        isPaused: false,
    });

    await order.save();

    const chat = new Chat({
        userId: req.body.myOrder.userid,
        orderId: order._id,
        message: 'Chat created at ' + dateFormat(now, "dd/mm/yyyy"),
    });

    await chat.save();

    res.send('Order Added');
    })
);

// Change Status

orderRouter.post('/changestatus', expressAsyncHandler(async (req, res) => {

        const order = await Order.findById(req.body.id);

        if (!order) {
            return res.send('Order not found !');
        }

        if (req.body.status === 'Pause') {
            order.isPaused = true;
            await order.save();
            return res.send('Order Paused !');
        }

        if (req.body.status === 'Resume') {
            order.isPaused = false;
            await order.save();
            return res.send('Order Resumed !');
        }

        order.status = req.body.status;

        if (req.body.status === 'In progress' && req.body.boosterId) {
            order.boosterId = req.body.boosterId
        }

        await order.save();

        if (req.body.status === 'Finished') {
            const user = await User.findById(order.boosterId);
            if(user) {
                user.payementPending = user.payementPending + ((order.price / 100) * user.percentage);
                user.save();
            }
            
        }

        if (req.body.status === 'Paied') {
            const user = await User.findById(order.boosterId);
            if (user) {
                user.payementPending = user.payementPending - ((order.price / 100) * user.percentage);
                user.totalRevenue = user.totalRevenue + ((order.price / 100) * user.percentage);
                user.save();
            }
        }



        res.send('Order paied');
    })
);

// DELETE Order

orderRouter.delete('/:id', expressAsyncHandler(async (req, res) => {

    await Order.deleteOne({ _id: req.params.id }, 
        function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Order Deleted');
    });

}));

export default orderRouter;

