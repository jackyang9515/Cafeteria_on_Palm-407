import express from "express";
import { addOption, getOptionById, updateOptionPrice, deleteOption } from '../controllers/optionController.js';
import auth from "../middleware/auth.js";

const optionRoute = express.Router();

//Can remove auth for faster testing experience in Postman
optionRoute.post('/option', auth, addOption);
optionRoute.get('/_Id/:_Id', auth, getOptionById);
optionRoute.put('/:_Id', auth, updateOptionPrice);
optionRoute.delete('/:_Id', auth, deleteOption);

export default optionRoute;