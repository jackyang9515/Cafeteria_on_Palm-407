import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
dotenv.config();

import Menu from '../structures/menuItemsStructure.js';
import { validateParam } from '../utils/util.js';

// Create new menu item
// http://0.0.0.0:4000/api/menu/menu
const addMenu = asyncHandler(async(req, res) => {
    const { categoryId, name, price} = req.body;
    validateParam(categoryId, res, 400, "menu item category is required");
    validateParam(name, res, 400, "menu item name is required");
    validateParam(price, res, 400, "menu item price is required");

    //Create new menu
    const menu = {
        categoryId: categoryId,
        name: name,
        price: price
    };

    if (req.body.description) {
        menu.description = req.body.description;
    }
    if (req.body.customizable) {
        menu.customizable = req.body.customizable;
    }

    const menuRes = await Menu.create(menu);
    console.log(menuRes);

    res.status(200).json(menuRes);
});

// Get menu item by id
// http://0.0.0.0:4000/api/menu/_Id/:_Id
const getMenuById = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "menu item id is required");

    var menu = await Menu.findById(_Id);

    res.status(200).json(menu);
});

// Get all menu items
// http://0.0.0.0:4000/api/menu/getAll
const getAllMenu = asyncHandler(async(req, res) => {
    var menu = await Menu.find({});

    res.status(200).json(menu);
});

// Update menu item price by menu item id
// http://0.0.0.0:4000/api/menu/:_Id
const updateMenuPrice = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    const { price } = req.body;
    validateParam(_Id, res, 400, "menu item id is required");
    validateParam(price, res, 400, "menu item price is required");

    var menu = await Menu.findById(_Id);
    menu.price = price;
    await menu.save();

    res.status(200).json(menu);
});

// Update menu item description by menu item id
// http://0.0.0.0:4000/api/menu/:_Id
const updateMenuDescription = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    const { description } = req.body;
    validateParam(_Id, res, 400, "menu item id is required");
    validateParam(description, res, 400, "menu item description is required");

    var menu = await Menu.findById(_Id);
    menu.description = description;
    await menu.save();

    res.status(200).json(menu);
});

// Delete menu by id
// http://0.0.0.0:4000/api/menu/:_Id
const deleteMenu = asyncHandler(async(req, res) => {
    const { _Id } = req.params;
    validateParam(_Id, res, 400, "menu item id is required");

    var menu = await Menu.findById(_Id);
    await menu.remove();

    res.status(200).json(menu);
});

export {
    addMenu,
    getMenuById,
    getAllMenu,
    updateMenuPrice,
    updateMenuDescription,
    deleteMenu
}