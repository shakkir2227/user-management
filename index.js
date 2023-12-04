const mongoose = require("mongoose");
const express = require("express");

mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");
``
const app = express();

//for user routes
const userRoute = require("./routes/userRoute.js");
app.use("/", userRoute);

//for admin routes
const adminRoute = require("./routes/adminRoute.js");
app.use("/admin", adminRoute);

app.listen(3000);
ap