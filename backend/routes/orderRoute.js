import express from "express";
import { addOrder, getOrder, getCurrentOrder, getOrderByOrderId, g, updateOrderStatus, deleteOrder  } from '../controllers/orderController.js';
import auth from "../middleware/auth.js";

const orderRoute = express.Router();

//Can remove auth for faster testing experience in Postman
orderRoute.post('/order', auth, addOrder);
orderRoute.get('/:id', auth, getOrder);
orderRoute.get('/currentOrder/:id', auth, getCurrentOrder);
orderRoute.get('/orderId/:orderId', auth, getOrderByOrderId);
orderRoute.get('/getall/allorder', g);
orderRoute.put('/:orderId', auth, updateOrderStatus);
orderRoute.delete('/:orderId', auth, deleteOrder);

export default orderRoute;