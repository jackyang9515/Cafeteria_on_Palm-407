import express from "express";
import { addCategory, getCategoryById, deleteCategory } from '../controllers/categoryController.js';
import auth from "../middleware/auth.js";

const categoryRoute = express.Router();

//Can remove auth for faster testing experience in Postman
categoryRoute.post('/category', auth, addCategory);
categoryRoute.get('/_Id/:_Id', auth, getCategoryById);
categoryRoute.delete('/:_Id', auth, deleteCategory);

export default categoryRoute;