import mongoose from "mongoose";
import { Decimal128 } from "mongodb";

//Menu details, name, category, desciption, price, if customizable
const menuItemsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Missing: item id is required"]
    },
    categoryId: {
        type: String,
        required: [true, "Missing: category is required"]
    },
    name: { 
        type: String,
        unique: [true, "Item already exists"],
        required: [true, "Missing: item name is required"]
    },
    description: { 
        type: String 
    },
    price: { 
        type: Decimal128, 
        required: [true, "Missing: price is required"]
    },
    customizable: { 
        type: Boolean, 
        default: false
    },
    image: {
        type: String
    }
});

export default mongoose.model('MenuItems', menuItemsSchema);