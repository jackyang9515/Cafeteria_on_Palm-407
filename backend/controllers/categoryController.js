import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
dotenv.config();

import Category from '../structures/categoryStructure.js';
import { validateParam } from '../utils/util.js';

// Create new category
// http://0.0.0.0:4000/api/category/category
const addCategory = asyncHandler(async(req, res) => {
    const { _Id, name} = req.body;
    validateParam(_Id, res, 400, "category id is required");
    validateParam(name, res, 400, "category name is required");

    //Create new category
    const category = {
        _Id: _Id,
        name: name
    };

    const categoryRes = await Category.create(category);
    console.log(categoryRes);

    res.status(200).json(categoryRes);
});

// Get category by id
// http://0.0.0.0:4000/api/category/_Id/:_Id
const getCategoryById = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "category id is required");

    var category = await Category.findById(_Id);

    res.status(200).json(category);
});

// Delete category by id
// http://0.0.0.0:4000/api/category/:_Id
const deleteCategory = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "category id is required");

    var category = await Category.findById(_Id);
    await category.remove();

    res.status(200).json(category);
});

export {
    addCategory,
    getCategoryById,
    deleteCategory
}