import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String},
    password: {type: String},
    summoner: {type: String},
}, {
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema);
export default Account;