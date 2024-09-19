import mongoose from "mongoose";

//Order that is linked to a customer account
const orderDetailSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: [true, "Missing: account_id is required"]
    },
    itemId: {    
        type: String,
        required: [true, "Missing: itemId is required"]
    },
    accountId: {
        type: String,
        required: [true, "Missing: account_id is required"]
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: [true, "Missing: price is required"]
    }
});

export default mongoose.model('OrderDetail', orderDetailSchema);