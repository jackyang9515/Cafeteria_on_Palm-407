import express from "express";
import { addOrderDetail, getOrderDetail, getOrderDetailByOrderId, updateOrderDetailQuantity, deleteOrderDetail } from '../controllers/orderDetailController.js';
import auth from "../middleware/auth.js";

const orderDetailRoute = express.Router();

//Can remove auth for faster testing experience in Postman
orderDetailRoute.post('/placeOrderDetail', auth, addOrderDetail);
orderDetailRoute.get('/orderId/:orderId', auth, getOrderDetailByOrderId);
orderDetailRoute.get('/:orderDetailId', auth, getOrderDetail);
orderDetailRoute.put('/:orderDetailId', auth, updateOrderDetailQuantity);
orderDetailRoute.delete('/:orderDetailId', auth, deleteOrderDetail);

export default orderDetailRoute;