import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import path from 'path';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import chatRouter from './routers/chatRouter.js'
import blogRouter from './routers/blogRouter.js';
import accountRouter from './routers/accountRouter.js';
import settingRouter from './routers/settingRouter.js';

dotenv.config();
const __dirname = path.dirname(import.meta.url).replace(/^file:\/\/\//, '');

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
app.use('/api/orders', orderRouter);
app.use('/api/chat', chatRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/setting', settingRouter);
app.use('/api/blogs', blogRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

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