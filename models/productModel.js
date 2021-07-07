import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String },
    category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    availability: { type: String },
    images: { type: [String], required: true },
    popular: { type : Boolean, default: false },
    related: { type: [mongoose.Schema.ObjectId], ref: 'Product' },
    width: { type: String },
    height: { type: String },
    matter: { type: String },
    delay: { type: String },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;