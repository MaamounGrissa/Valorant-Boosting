import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    rank: { type: Number },
    desiredRank: { type: Number },
    division: { type: Number },
    desiredDivision: { type: Number },
    games: { type: Number },
    win: { type: Number },
    amount: { type: Number },
}, {
    timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;