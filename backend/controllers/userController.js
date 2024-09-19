import asyncHandler from 'express-async-handler';
//For access token
import jwt from 'jsonwebtoken';
//For password encryption
import bcrypt from 'bcryptjs';
//For environment variables, such as JWT_KEY. Instantiates .env in backend folder
import dotenv from 'dotenv';
dotenv.config();

import User from '../structures/userStructure.js';
import { validateParam } from '../utils/util.js';

// Create JWT token that expires in 10 days
const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "10d" });
};

const getToken = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
});

// Create passenger's profile
//POST http://0.0.0.0:4000/api/user/register
const register = asyncHandler(async(req, res) => {
    //Validate required parameters, username, password and email
    const { firstName, lastName, username, password, confirmPassword, email } = req.body;
    validateParam(firstName, res, 400, "firstName is required");
    validateParam(lastName, res, 400, "lastName is required");
    validateParam(username, res, 400, "username is required");
    validateParam(password, res, 400, "password is required");
    validateParam(confirmPassword, res, 400, "confirmPassword is required");
    validateParam(email, res, 400, "email is required");

    //Check if the same username or email already exists
    const userByUsername = await User.findOne({ username });
    const userByEmail = await User.findOne({ email });
    if (userByUsername || userByEmail) {
        res.status(400);
        throw new Error("User already exist. Please login");
    }

    //Check if password and confirmPassword match
    if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Password and confirmPassword do not match");
    }

    //Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //Create newUser object
    var newUser = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hashed,
        email: email,
    };
    console.log(process.env.ADMIN_KEY);
    if (username === process.env.ADMIN_KEY) {
        newUser.isAdmin = true;
    }

    //Create new profile
    const newUserRes = await User.create(newUser);

    //If user is created successfully, send back the user's credentials along with a JWT token
    if (newUserRes) {
            res
                .status(201)
                .cookie("token", createJWT(newUser._id), {
                expires: new Date(Date.now() + 900000000),
                httpOnly: true,
                secure: true,
            })
        .json({
            _id: newUserRes._id,
            firstName: newUserRes.firstName,
            lastName: newUserRes.lastName,
            username: newUserRes.username,
            email: newUserRes.email,
            isAdmin: newUserRes.isAdmin,
            token: createJWT(newUserRes._id),
        });
      }
      //Send error failed to create user
      else {
          res.status(400);
          throw new Error("User not created");
      }
});

//Login a user(require username and password)
//POST http://0.0.0.0:4000/api/user/login
const login = asyncHandler(async (req, res) => {
    //Check required fields
    const { username, password } = req.body;
    validateParam(username, res, 400, "username is required");
    validateParam(password, res, 400, "password is required");

    //Check if user exists and password is correct
    const user = await User.findOne({ username });
    validateParam(user, res, 404, "User not found");

    //Check if password is correct
    const userResult = bcrypt.compareSync(password, user.password);
    console.log(userResult);

    if (userResult === true) {
        res
        .status(201)
        .cookie("token", createJWT(user._id), {
            expires: new Date(Date.now() + 900000000),
            httpOnly: true,
            secure: true,
        })
        .json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createJWT(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Failed to login");
    }
});
  
//user logout
//PATCH http://0.0.0.0:4000/api/user/logout
const logout = asyncHandler(async (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.status(400);
            throw new Error("Failed to logout");
        }
        res.status(201)
            .cookie("token", "nothing", {
                httpOnly: true,
                expires: new Date(Date.now() + 1),
                httpOnly: true,
                secure: true,
            })
            .json({
                message: "Logged out",
            });
    });
});

//Get user by id
//GET http://0.0.0.0:4000/api/user/:userid
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.userid }).select([
        "email",
        "username",
        "firstName",
        "lastName",
        "isAdmin"
    ]);
    if (user) {
        res.status(200).json(user);
    }
    //Send error faild to find user
    else {
        res.status(404);
        throw new Error("User not found");
    }
});

//Update user password
//PUT http://0.0.0.0:4000/api/user/changePassword/:userid
const changePassword = asyncHandler(async (req, res) => {
    //Check required fields
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    validateParam(oldPassword, res, 400, "oldPassword is required");
    validateParam(newPassword, res, 400, "newPassword is required");
    validateParam(confirmNewPassword, res, 400, "newPasswordConfirm is required");

    //Check if user exists and password is correct
    const user = await User.findOne({ _id: req.params.userid });
    validateParam(user, res, 404, "User not found");

    //Check if oldPassword is correct and newPassword is different from oldPassword
    const passwordResult = bcrypt.compareSync(oldPassword, user.password);
    if (passwordResult === false) {
        res.status(401);
        throw new Error("Incorrect password");
    }
    if (oldPassword === newPassword) {
        res.status(400);
        throw new Error("New password must be different from old password");
    }
    if (newPassword !== confirmNewPassword) {
        res.status(400);
        throw new Error("New password and confirm new password do not match");
    }

    //Initialize mask
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    //Update user password
    const result = await User.updateOne(
        { _id: user._id },
        { $set: { password: hashed } }
    );
    
    if (result.modifiedCount == 0) {
        res.status(400);
        throw new Error("failed to modify password");
    }
    else {
        res.status(200).json({
            message: "Password modified successfully",
            _id: user._id
        });
    }
});

//Updates the user's avatar, first name, last name and username
//PUT http://0.0.0.0:4000/api/user/updateProfile/:userid
const updateProfile = asyncHandler(async (req, res) => {
    // Check required fields, user has the option to not update avatar, and the rest are prefilled
    const { firstName, lastName, username } = req.body;
    validateParam(firstName, res, 400, "firstName is required");
    validateParam(lastName, res, 400, "lastName is required");
    validateParam(username, res, 400, "username is required");

    // Find user by id
    var user = await User.findById(req.params.userid);
    if (!user) {
        res.status(404);
        throw new Error("Profile not found");
    }

    //Update user password
    const items = {
        firstName: firstName,
        lastName: lastName,
        username: username,
    }
    if (req.body.image) {
        var str = req.body.image;
        //Read it into a buffer
        const buffer = Buffer(str, 'base64');
        items.avatar = buffer;
    }
    const result = await User.updateOne(
        { _id: user._id },
        { $set: items }
    );
    
    if (result.modifiedCount < items.length) {
        res.status(400);
        throw new Error("failed to modify password");
    }
    else {
        items.status = "Successfully modified profile";
        res.status(200).json(items);
    }
});

export {
    register,
    getUser,
    login,
    logout,
    changePassword,
    updateProfile,
};