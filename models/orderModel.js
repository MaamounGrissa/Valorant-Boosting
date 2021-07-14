import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    status: { type: String, required: true },
    userId: {type: String, required: true },
    boosterId: {type: String },
    account: {type: String },
    password: { type: String },
    summoner: { type: String },
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
    payementFullName: { type: String },
    payementBillingAdress: { type: String },
    payementCity: { type: String },
    payementZipCode: { type: String },
    payementAdress: { type: String },
}, {
    timestamps: true
});


const Order = mongoose.model('Order', orderSchema);
export default Order;