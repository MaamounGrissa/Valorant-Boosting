import mongoose from 'mongoose';

const instagramSchema = new mongoose.Schema({
    url: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});

const Instagram = mongoose.model('Instagram', instagramSchema);

export default Instagram;