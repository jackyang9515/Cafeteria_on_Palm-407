import mongoose from "mongoose";

//Order that is linked to a customer account
const orderSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: [true, "Missing: account_id is required"]
    },
    timestamp: {
        type: String
    },
    isCurrent: {    
        type: Number,
        // 1: Order is still on the customer's cart
        // 2: Order is already paid and is can be processed by the kitchen
        // 3: Order is already processed by the kitchen and has become history
        default: 2
    },
    totalAmount: {
        type: Number,
        required: [true, "Missing: total_amount is required"],
        default: 0
    }
});

export default mongoose.model('Order', orderSchema);