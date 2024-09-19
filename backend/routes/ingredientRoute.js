import express from "express";
import { addIngredient, getIngredientById, updateIngredientPrice, updateIngredientDescription, deleteIngredient } from '../controllers/ingredientController.js';
import auth from "../middleware/auth.js";

const ingredientRoute = express.Router();

//Can remove auth for faster testing experience in Postman
ingredientRoute.post('/ingredient', auth, addIngredient);
ingredientRoute.get('/_Id/:_Id', auth, getIngredientById);
ingredientRoute.put('/:_Id', auth, updateIngredientPrice);
ingredientRoute.put('/:_Id', auth, updateIngredientDescription);
ingredientRoute.delete('/:_Id', auth, deleteIngredient);

export default ingredientRoute;