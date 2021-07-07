import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import data from '../data.js';

const categoryRouter = express.Router();

categoryRouter.get('/', expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
}))

categoryRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // Remove All Categories
    // await Category.remove({});
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
}))

categoryRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    const products = await Product.find({category: req.params.id});
    if (category) {
        // category.products = await Product.find({category: req.params.id});
        res.send([category, products]);
    } else {
        res.status(404).send({message: 'Category Not Found'});
    }
}))

export default categoryRouter;