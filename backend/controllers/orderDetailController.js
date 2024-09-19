import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

import OrderDetail from '../structures/orderDetailStructure.js';
import { validateParam } from '../utils/util.js';

// Create new order
// http://0.0.0.0:4000/api/orderDetail/placeOrderDetail
const addOrderDetail = asyncHandler(async(req, res) => {
    const { orderId, itemId, accountId, price } = req.body;
    validateParam(orderId, res, 400, "order's orderId is required");
    validateParam(itemId, res, 400, "order's itemId is required");
    validateParam(accountId, res, 400, "order's accountId is required");
    validateParam(price, res, 400, "order's price is required");

    //Create new order
    const orderDetail = {
        orderId: orderId,
        itemId: itemId,
        accountId: accountId,
        price: price
    };
    if (req.body.quantity) {
        orderDetail.quantity = req.body.quantity;
    }

    const orderDetailRes = await OrderDetail.create(orderDetail);
    console.log(orderDetailRes);

    res.status(200).json(orderDetailRes);
});

// Get all orderDetails under a order
// http://0.0.0.0:4000/api/orderDetail/orderId/:orderId
const getOrderDetailByOrderId = asyncHandler(async(req, res) => {
    const { orderId } = req.params;
    validateParam(orderId, res, 400, "order's id is required");

    var orderDetails = await OrderDetail.find({ orderId: orderId });

    res.status(200).json(orderDetails);
});

// Get order by order's id
// http://0.0.0.0:4000/api/orderDetail/:orderDetailId
const getOrderDetail = asyncHandler(async(req, res) => {
    const { orderDetailId } = req.params;
    validateParam(orderDetailId, res, 400, "order's id is required");

    var orderDetail = await OrderDetail.findById(orderDetailId);

    res.status(200).json(orderDetail);
});

// Update order detail's quantity and price by orderDetail's id
// http://0.0.0.0:4000/api/orderDetail/:orderDetailId
const updateOrderDetailQuantity = asyncHandler(async(req, res) => {
    const { orderDetailId } = req.params;
    const { quantity, price } = req.body;
    validateParam(orderDetailId, res, 400, "order's id is required");
    validateParam(quantity, res, 400, "order's quantity is required");
    validateParam(price, res, 400, "order's price is required");

    var orderDetail = await OrderDetail.findById(orderDetailId);
    orderDetail.quantity = quantity;
    orderDetail.price = price;
    await orderDetail.save();

    res.status(200).json(orderDetail);
});

// Delete order by order's id
// http://0.0.0.0:4000/api/orderDetail/:orderDetailId
const deleteOrderDetail = asyncHandler(async(req, res) => {
    const { orderDetailId } = req.params;
    validateParam(orderDetailId, res, 400, "order's id is required");

    var orderDetail = await OrderDetail.findById(orderDetailId);
    await orderDetail.remove();

    res.status(200).json(orderDetail);
});

export {
    addOrderDetail,
    getOrderDetail,
    getOrderDetailByOrderId,
    updateOrderDetailQuantity,
    deleteOrderDetail
}

