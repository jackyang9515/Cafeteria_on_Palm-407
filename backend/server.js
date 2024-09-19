import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";

import config from "./config/config.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js"
import menuRoute from "./routes/menuRoute.js"
import optionRoute from "./routes/optionRoute.js"
import ingredientRoute from "./routes/ingredientRoute.js"
import orderRoute from "./routes/orderRoute.js";
import orderDetailRoute from "./routes/orderDetailRoute.js";

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true }, () => {
  console.log("Start to connect to MongoDB!");
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express(); 
const port = config.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    await db.collection("categories").insertOne({_id: "10", name: "Breakfast"});
    db.collection("categories", function(err, collection){
        collection.find().toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });
    await categorySchema.find().then((data) => {
        res.send(data);
    });

});

app.use(passport.initialize());
//app.use(passport.session());

app.use(expressSession({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 900000000,
    //     httpOnly: true,
    //     secure: true,
    // },
}));

app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/orderDetail", orderDetailRoute);
app.use("/api/category", categoryRoute);
app.use("/api/ingredient", ingredientRoute);
app.use("/api/menu", menuRoute);
app.use("/api/option", optionRoute);


app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});