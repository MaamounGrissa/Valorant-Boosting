import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Order from '../models/orderModel.js';

const orderRouter = express.Router();

// GET ALL Orders

orderRouter.get('/', expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
}));


// Seed Users From Data.js

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
        
    const order = new Order({
            status: 'Looking for a booster',
            userId: req.body.userid,
            account: req.body.account ? req.body.account : '',
            password: req.body.password ? req.body.password : '',
            summoner: req.body.summoner ? req.body.summoner: '',
            server: req.body.server,
            boostType: req.body.type,
            startRank: req.body.startrank,
            startDivision: req.body.startdivision,
            rankRating: req.body.rankrating ? req.body.rankrating : '',
            desiredRank: req.body.desiredrank,
            desiredDivision: req.body.desireddivision,
            games: req.body.games ? req.body.games : '',
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

        res.send('Order Added');
    })
)

export default orderRouter;
