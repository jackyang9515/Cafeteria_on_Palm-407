import express from "express";
import { register, getUser, login, logout, changePassword, updateProfile } from '../controllers/userController.js';
import auth from "../middleware/auth.js";

const userRoute = express.Router();

userRoute.post('/register', register);
userRoute.get('/:userid', auth, getUser);
userRoute.post('/login', login);
userRoute.post('/logout', logout);
userRoute.put('/changePassword/:userid', auth, changePassword);
userRoute.put('/updateProfile/:userid', auth, updateProfile);

export default userRoute;