import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import categoryRouter from './routers/categoryRouter.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import sliderRouter from './routers/sliderRouter.js';
import projectRouter from './routers/projectRouter.js';
import blogRouter from './routers/blogRouter.js';
import instagramRouter from './routers/instagramRouter.js';
import path from 'path';

dotenv.config();

// Define Express App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const uri = "mongodb+srv://maamoun:Grissa1906@cluster0.wslrq.mongodb.net/Cluster0?retryWrites=true&w=majority";
const uri = "mongodb+srv://maamoun:sHgLCLYgHV8MDznf@valorantboosting.lyq9o.mongodb.net/valorantboosting?retryWrites=true&w=majority"

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_URL || uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}); 

app.use(fileUpload());

// Routes
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/sliders', sliderRouter);
app.use('/api/projects', projectRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/instagrams', instagramRouter);

/* 
app.get('/', (req, res) => {
    res.send('Server is ready!');
}); 
*/

// Return Error =>
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

// Define Port
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    // set static frontend path
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

// Server Listen
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})