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

    const divisionPrice = await Setting.findOne({name : 'division-price'});
    if (req.body.divisionPrice) { 
        divisionPrice.value = req.body.divisionPrice;
        await divisionPrice.save();
    }

    const difficultyCoef = await Setting.findOne({name : 'difficulty-coef'});
    if (req.body.difficultyCoef) {
        difficultyCoef.value = req.body.difficultyCoef;
        await difficultyCoef.save();
    } 
    
    res.send('Setting Saved !');
}));

export default settingRouter;
