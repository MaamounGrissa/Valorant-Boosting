import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    status: { type: String, required: true },
    userId: {type: String, required: true },
    boosterId: {type: String },
    server: { type: String },
    boostType: { type: String },
    startRank: { type: Number },
    startDivision: { type: Number },
    rankRating: { type: Number },
    desiredRank: { type: Number },
    desiredDivision: { type: Number },
    games: { type: Number },
    duoGame: { type: Boolean },
    chatOffine: { type: Boolean },
    specificAgents: { type: Boolean },
    priorityOrder: { type: Boolean },
    withStreaming: { type: Boolean },
    price: { type: Number },
    payement: { type: String },
    isPaused: { type: Boolean, default: false },
}, {
    timestamps: true
});


const Order = mongoose.model('Order', orderSchema);
export default Order;