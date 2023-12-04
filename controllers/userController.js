const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const loadRegister = (req, res) => {
    try {
        res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render("registration")
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error ");
    }
}

const insertUser = async (req, res) => {
    try {
        const spassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            password: spassword,
            is_Admin: 0,

        });

        const userData = await user.save();

        if (userData) {
            res.render("registration", { message: "your registration has been completed successfully" })
        }
        else {
            res.render("registration", { message: "your registration has been failed" })
        }

    }
    catch (error) {
        console.log(error.message);
    }
}

const loginLoad = (req, res) => {
    try {
        res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render("login")
    }
    catch {

    }
}

const verifyLogin = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
            if (passwordMatch) {
                req.session.user_id = userData._id;
                res.redirect("/home");

            } else {
                res.render("login", { message: "login failed" })
            }
        }
        else {
            res.render("login", { message: "login failed" })
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

const loadHome = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.session.user_id });
        res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render("home", { userData })
    }
    catch (error) {
        console.log(error.message);
    }
}

const userLogout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
}


module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,

}


