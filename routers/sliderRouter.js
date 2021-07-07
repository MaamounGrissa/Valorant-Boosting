import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Slider from '../models/SliderModel.js';

const sliderRouter = express.Router();

sliderRouter.get('/', expressAsyncHandler(async (req, res) => {
    const sliders = await Slider.find({});
    res.send(sliders);
}));

sliderRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    // Remove All Products
    // await Slider.remove({});
    const createdSliders = await Slider.insertMany(data.sliders);
    res.send({ createdSliders });
}));


export default sliderRouter;