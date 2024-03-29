import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import data from '../data.js';

const chatRouter = express.Router();

// GET ALL Chat

chatRouter.get('/', expressAsyncHandler(async (req, res) => {
    const chat = await Chat.find({});
    res.send(chat);
}));

// GET MY Chat

chatRouter.post('/getorderchat', expressAsyncHandler(async (req, res) => {
    const chat = await Chat.find({ orderId: req.body.orderId});
    res.send(chat);
}));

// Seed Chat From Data.js

chatRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // Remove All Chat
    await Chat.deleteMany({});

    // Create Chat ( SEED ) from data.js 
    const createdChat = await Chat.insertMany(data.chat);

    // Display Created Chat
    res.send({ createdChat });
})
);

// Add Message

chatRouter.post( '/add', expressAsyncHandler(async (req, res) => {
        
    const chat = new Chat({
           userId: req.body.userId,
           orderId: req.body.orderId,
           message: req.body.message,
        });
        
    await chat.save();
    res.send('Message sent !');
}));



export default chatRouter;

