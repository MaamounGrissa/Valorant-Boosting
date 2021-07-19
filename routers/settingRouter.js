import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Setting from '../models/settingModel.js';
import data from '../data.js';

const settingRouter = express.Router();

// GET ALL Settings

settingRouter.get('/', expressAsyncHandler(async (req, res) => {
    const setting = await Setting.find({});
    res.send(setting);
}));

// Seed Setting From Data.js

settingRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // Remove All Account
    await Setting.deleteMany({});

    // Create Setting ( SEED ) from data.js 
    const createdSetting = await Setting.insertMany(data.setting);

    // Display Created Setting
    res.send({ createdSetting });
})
);

// Edit Setting

settingRouter.post( '/edit', expressAsyncHandler(async (req, res) => {
    const setting = await Setting.findOne({_id : req.body.id});
    if (!setting) { 
        res.status(404).send({message: 'Setting not found'});
    } else {
        setting.amount = req.body.newValue
        await setting.save()
        res.send('Setting Saved !');
    }
}));

export default settingRouter;
