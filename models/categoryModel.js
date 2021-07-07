import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    headerImage: { type: String, required: true },
    parentId: { type: String, default: 0, required: true },
    // products: { type: [mongoose.Schema.ObjectId], ref: 'Product' },
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;