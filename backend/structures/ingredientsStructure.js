import mongoose from "mongoose";
import { Decimal128 } from "mongodb";

// Categories for food, breakfast, lunch, allday
const ingredientsSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: [true, "Missing: _id is required"]
    },
    custom_option_id: { 
        type: String,
        required: [true, "Missing: _id is required"]
    },
    name: { 
        type: String,
        unique: [false, "Category already exists"],
        required: [true, "Missing: _id is required"]
    },
    additional_price: { 
        type: Decimal128 
    },
    description: { 
        type: String
    },
});

export default mongoose.model('Ingredients', ingredientsSchema);