import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Instagram from '../models/instagramModel.js';
import data from '../data.js';

const instagramRouter = express.Router();

instagramRouter.get('/', expressAsyncHandler(async (req, res) => {
    const instagrams = await Instagram.find({});
    res.send(instagrams);
}))

instagramRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // Remove All Instagrams
    // await Blog.remove({});
    const createdInstagrams = await Instagram.insertMany(data.instagram);
    res.send({ createdInstagrams });
}))

instagramRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const instagram = await Instagram.findById(req.params.id);
    if (instagram) {
        res.send(instagram);
    } else {
        res.status(404).send({message: 'Instagram Link Not Found'});
    }
}))

export default instagramRouter;