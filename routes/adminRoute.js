const express = require("express");
const session = require("express-session");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/adminAuth")

const admin_route = express();
admin_route.use(express.urlencoded({ extended: true }))
admin_route.use(session({
    secret: "randomsecretssofmysessionvalues123",
    resave: false,
    saveUninitialized: false,
}));


admin_route.set("view engine", "ejs");
admin_route.set("views", "./views/admin")

admin_route.get("/", auth.isLogout, adminController.loginLoad)
admin_route.get("/login", auth.isLogout, adminController.loginLoad)
admin_route.post("/", adminController.verifyLogin)
admin_route.get("/home", auth.isLogin, adminController.loadHome)
admin_route.get("/logout", auth.isLogin, adminController.logout)
admin_route.get("/dashboard", auth.isLogin, adminController.adminDashboard)
admin_route.get("/new-user", auth.isLogin, adminController.newUserLoad)
admin_route.post("/new-user", adminController.addUser)
admin_route.get("/edit-user", auth.isLogin, adminController.editUserLoad)
admin_route.post("/edit-user", adminController.updateUsers);
admin_route.get("/delete-user", auth.isLogin, adminController.deleteUser)
admin_route.post("/dashboard", adminController.searchUser)






module.exports = admin_route;