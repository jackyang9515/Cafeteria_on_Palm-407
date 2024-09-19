import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
dotenv.config();

import Option from '../structures/optionStructure.js';
import { validateParam } from '../utils/util.js';

// Create new option item
// http://0.0.0.0:4000/api/option/option
const addOption = asyncHandler(async(req, res) => {
    const { _Id, item_id, name, price} = req.body;
    validateParam(_Id, res, 400, "option item id is required");
    validateParam(item_id, res, 400, "option item category is required");
    validateParam(name, res, 400, "option item name is required");
    validateParam(price, res, 400, "option item price is required");

    //Create new option
    const option = {
        _Id: _Id,
        categoryId: categoryId,
        name: name,
        price: price
    };

    const optionRes = await Option.create(option);
    console.log(optionRes);

    res.status(200).json(optionRes);
});

// Get option item by id
// http://0.0.0.0:4000/api/option/_Id/:_Id
const getOptionById = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "option item id is required");

    var option = await Option.findById(_Id);

    res.status(200).json(option);
});

// Update option item price by option item id
// http://0.0.0.0:4000/api/option/:_Id
const updateOptionPrice = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    const { price } = req.body;
    validateParam(_Id, res, 400, "option item id is required");
    validateParam(price, res, 400, "option item price is required");

    var option = await Option.findById(_Id);
    option.price = price;
    await option.save();

    res.status(200).json(option);
});

// Delete option by id
// http://0.0.0.0:4000/api/option/:_Id
const deleteOption = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "option item id is required");

    var option = await Option.findById(_Id);
    await option.remove();

    res.status(200).json(option);
});

export {
    addOption,
    getOptionById,
    updateOptionPrice,
    deleteOption
}