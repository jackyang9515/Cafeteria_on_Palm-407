import asyncHandler from 'express-async-handler';

//For access token
import jwt from 'jsonwebtoken';
//For password encryption
import bcrypt from 'bcryptjs';
//For environment variables, such as JWT_KEY. Instantiates .env in backend folder
import dotenv from 'dotenv';
dotenv.config();

import Order from '../structures/orderStructure.js';
import OrderDetail from '../structures/orderDetailStructure.js';
import { validateParam } from '../utils/util.js';

// Create new order
// http://0.0.0.0:4000/api/order/order
const addOrder = asyncHandler(async(req, res) => {
    //We only check if accountId and totalAmount are provided, and timestamp is by default Date.now and isCurrent is by default true
    const { accountId, timestamp, orderList } = req.body;
    validateParam(accountId, res, 400, "order's accountId is required");
    if (orderList.length == 0) {
        res.status(400).json({ message: "order's orderList is required" });
    }

    //Create new order
    const order = {
        accountId: accountId,
    };
    if (timestamp != null) {
        order.timestamp = timestamp.toString();
    }
    else {
        order.timestamp = new Date().toString();
    }

    const orderRes = await Order.create(order);

    //Create all the order details
    for (var i = 0; i < orderList.length; i++) {
        const orderDetail = {
            orderId: orderRes._id.toString(),
            itemId: orderList[i].itemId,
            accountId: accountId,
            price: orderList[i].price,
        };
        if (orderList[i].quantity) {
            orderDetail.quantity = orderList[i].quantity;
        }
        await OrderDetail.create(orderDetail);
    }

    res.status(200).json(orderRes);
});

// Get all orders of a customer
// http://0.0.0.0:4000/api/order/:id
const getOrder = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateParam(id, res, 400, "order's id is required");

    var orders = await Order.find({ accountId: id });

    res.status(200).json(orders);
});

// Get current order of a customer
// http://0.0.0.0:4000/api/order/currentOrder/:id
const getCurrentOrder = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateParam(id, res, 400, "order's id is required");

    var orders = await Order.find({ accountId: id, isCurrent: 1 });
    res.status(200).json(orders);
});

// Get all orders
// http://0.0.0.0:4000/api/order/getall
const g = asyncHandler(async(req, res) => {
    // console.log("getAllCurrentOrders");
    // const today = new Date();
    // today.setHours(0,0,0,0);
    console.log("here");
    var orders = await Order.find({ isCurrent: 2 });
    console.log(orders);
    // const resultOrders = [];
    // var orderTime = null;
    // for (var i = 0; i < orders.length; i++) {
    //     orderTime = new Date(orders[i].timestamp);
    //     if (orderTime instanceof Date && !isNaN(orderTime) && orderTime > today) {
    //         resultOrders.push(orders[i]);
    //     }
    // }
    res.status(200).json(orders);
});

// Get order by order's id
// http://0.0.0.0:4000/api/order/orderId/:orderId
const getOrderByOrderId = asyncHandler(async(req, res) => {
    const { orderId } = req.params;
    validateParam(orderId, res, 400, "order's id is required");

    var order = await Order.findById(orderId);

    res.status(200).json(order);
});

// Update order status by order's id
// http://0.0.0.0:4000/api/order/:orderId
const updateOrderStatus = asyncHandler(async(req, res) => {
    const { orderId } = req.params;
    const { timestamp } = req.body;
    validateParam(orderId, res, 400, "order's id is required");
    validateParam(timestamp, res, 400, "order's timestamp is required");

    var order = await Order.findById(orderId);
    order.isCurrent = 2;
    order.timestamp = timestamp;
    await order.save();

    res.status(200).json(order);
});

// Delete order by order's id
// http://0.0.0.0:4000/api/order/:orderId
const deleteOrder = asyncHandler(async(req, res) => {
    const { orderId } = req.params;
    validateParam(orderId, res, 400, "order's id is required");

    var order = await Order.findById(orderId);
    await order.remove();

    res.status(200).json(order);
});

export {
    addOrder,
    getOrder,
    getCurrentOrder,
    g,
    getOrderByOrderId,
    updateOrderStatus,
    deleteOrder
}

