import mongoose from "mongoose";
import { Decimal128 } from "mongodb";

// Categories for food, breakfast, lunch, allday
const optionsSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: [true, "Missing: _id is required"]
    },
    item_id: { 
        type: String,
        required: [true, "Missing: item_id is required"]
    },
    name: { 
        type: String,
        required: [true, "Missing: name is required"],
        unique: [false, "Option already exists"]
    },
    price: { 
        type: Decimal128, 
        required: [true, "Missing: price is required"]
    },
});

export default mongoose.model('Options', optionsSchema);