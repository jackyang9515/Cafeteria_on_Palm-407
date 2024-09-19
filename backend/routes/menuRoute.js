import express from "express";
import { addMenu, getMenuById, getAllMenu, updateMenuPrice, updateMenuDescription, deleteMenu } from '../controllers/menuController.js';
import auth from "../middleware/auth.js";

const menuRoute = express.Router();

//Can remove auth for faster testing experience in Postman
menuRoute.post('/menu', addMenu);
menuRoute.get('/_Id/:_Id', auth, getMenuById);
menuRoute.get('/getAll', getAllMenu);
menuRoute.put('/:_Id', auth, updateMenuPrice);
menuRoute.put('/:_Id', auth, updateMenuDescription);
menuRoute.delete('/:_Id', auth, deleteMenu);

export default menuRoute;