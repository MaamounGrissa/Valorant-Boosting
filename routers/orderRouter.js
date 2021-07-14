import express from 'express';
import dateFormat from 'dateformat';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import Order from '../models/orderModel.js';

const orderRouter = express.Router();

// GET ALL Orders

orderRouter.get('/', expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
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
            account: req.body.account ? req.body.account : '',
            password: req.body.password ? req.body.password : '',
            summoner: req.body.summoner ? req.body.summoner: '',
            server: req.body.server,
            boostType: req.body.type,
            startRank: req.body.startrank ? req.body.startrank : 0,
            startDivision: req.body.startdivision ? req.body.startdivision : 0,
            rankRating: req.body.rankrating ? req.body.rankrating : 0,
            desiredRank: req.body.desiredrank,
            desiredDivision: req.body.desireddivision,
            games: req.body.games ? req.body.games : 0,
            duoGame:  req.body.duogame,
            chatOffine: req.body.chatoffline,
            specificAgents: req.body.specificagents,
            priorityOrder: req.body.priorityorder,
            withStreaming: req.body.withstreaming,
            price: req.body.price,
            payement: req.body.payement,
            payementFullName: req.body.payementfullname ? req.body.payementfullname : '',
            payementBillingAdress: req.body.payementbillingadress ? req.body.payementbillingadress : '',
            payementCity: req.body.city ? req.body.city : '',
            payementZipCode: req.body.zipcode ? req.body.zipcode : '',
            payementAdress: req.body.adress ? req.body.adress : '',
        });
        await order.save();

        const chat = new Chat({
            userId: req.body.userid,
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

        order.status = req.body.status;

        if(req.body.status === 'In progress' && req.body.boosterId) {
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

