import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
dotenv.config();

import Ingredient from '../structures/ingredientsStructure.js';
import { validateParam } from '../utils/util.js';

// Create new ingredient item
// http://0.0.0.0:4000/api/ingredient/ingredient
const addIngredient = asyncHandler(async(req, res) => {
    const { _Id, custom_option_id, name} = req.body;
    validateParam(_Id, res, 400, "ingredient item id is required");
    validateParam(custom_option_id, res, 400, "ingredient item custom option id is required");
    validateParam(name, res, 400, "ingredient item name is required");
    
    //Create new ingredient
    const ingredient = {
        _Id: _Id,
        custom_option_id: custom_option_id,
        name: name,
    };

    if (req.body.description) {
        ingredient.description = req.body.description;
    }
    if (req.body.additional_price) {
        ingredient.additional_price = req.body.additional_price;
    }

    const ingredientRes = await Ingredient.create(ingredient);
    console.log(ingredientRes);

    res.status(200).json(ingredientRes);
});

// Get ingredient item by id
// http://0.0.0.0:4000/api/ingredient/_Id/:_Id
const getIngredientById = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "ingredient item id is required");

    var ingredient = await Ingredient.findById(_Id);

    res.status(200).json(ingredient);
});

// Update ingredient item price by ingredient item id
// http://0.0.0.0:4000/api/ingredient/:_Id
const updateIngredientPrice = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    const { additional_price } = req.body;
    validateParam(_Id, res, 400, "ingredient item id is required");
    validateParam(additional_price, res, 400, "ingredient item price is required");

    var ingredient = await Ingredient.findById(_Id);
    ingredient.additional_price = additional_price;
    await ingredient.save();

    res.status(200).json(ingredient);
});

// Update ingredient item description by ingredient item id
// http://0.0.0.0:4000/api/ingredient/:_Id
const updateIngredientDescription = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    const { description } = req.body;
    validateParam(_Id, res, 400, "ingredient item id is required");
    validateParam(description, res, 400, "ingredient item description is required");

    var ingredient = await Ingredient.findById(_Id);
    ingredient.description = description;
    await ingredient.save();

    res.status(200).json(ingredient);
});

// Delete ingredient by id
// http://0.0.0.0:4000/api/ingredient/:_Id
const deleteIngredient = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "ingredient item id is required");

    var ingredient = await Ingredient.findById(_Id);
    await ingredient.remove();

    res.status(200).json(ingredient);
});

export {
    addIngredient,
    getIngredientById,
    updateIngredientPrice,
    updateIngredientDescription,
    deleteIngredient
}