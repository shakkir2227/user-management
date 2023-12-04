const express = require("express");
const session = require("express-session");
const auth = require("../middleware/auth.js");
const userController = require("../controllers/userController");

const user_route = express();
user_route.use(session({
    secret: "randomsecretssofmysessionvalues123",
    resave: false,
    saveUninitialized: false,
}));



user_route.set("view engine", "ejs");
user_route.set("views", "./views/users")
user_route.use(express.urlencoded({ extended: true }))




user_route.get("/register", auth.isLogout, userController.loadRegister);
user_route.post("/register", userController.insertUser);
user_route.get("/", auth.isLogout, userController.loginLoad);
user_route.get("/login", auth.isLogout, userController.loginLoad);
user_route.post("/login", userController.verifyLogin);
user_route.get("/home", auth.isLogin, userController.loadHome);
user_route.get("/logout", auth.isLogin, userController.userLogout);


module.exports = user_route;