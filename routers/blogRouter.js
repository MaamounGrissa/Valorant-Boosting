import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import data from '../data.js';

const blogRouter = express.Router();

blogRouter.get('/', expressAsyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.send(blogs);
}))

blogRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // Remove All Blogs
    // await Blog.remove({});
    const createdBlogs = await Blog.insertMany(data.blog);
    res.send({ createdBlogs });
}))

blogRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.send(blog);
    } else {
        res.status(404).send({message: 'Blog Not Found'});
    }
}))

export default blogRouter;