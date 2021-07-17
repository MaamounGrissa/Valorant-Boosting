import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    value: {type: String},
}, {
    timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;