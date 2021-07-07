import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    button: { type: String, required: true },
    buttonLink: { type: String, required: true},
    image: { type: String, required: true },
}, {
    timestamps: true,
});

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;