import mongoose from "mongoose";

//A passenger should have a username, password, email, and if it is an admin account.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Missing: firstName is required"],
    },
    lastName: {
        type: String,
        required: [true, "Missing: lastName is required"],
    },
    username: {
        type: String,
        required: [true, "Missing: username is required"],
        unique: [true, "Username already exists"],
    },
    password: { 
        type: String,
        required: [true, "Missing: password is required"], 
    },
    email: { 
        type: String, 
        required: [true, "Missing: email is required"],
        unique: [true, "Email already exists"], 
    },
    isAdmin: { 
        type: Boolean, 
        default: false,
    },
    avatar: {
        type: String
    }
});

export default mongoose.model('User', userSchema);