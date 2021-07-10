import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rule: { type: String, default: true, required: true},
    photo: { type: String },
    rank: { type: String },
    paypal: { type: String },
    percentage: { type: String },

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;