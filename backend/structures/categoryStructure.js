import mongoose from "mongoose";

// Categories for food, breakfast, lunch, allday
const categoriesSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "Missing: name is required"],
        unique: [false, "Category already exists"]
    },
});

export default mongoose.model('Categories', categoriesSchema);