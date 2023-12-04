const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");



const loginLoad = (req, res) => {
    try {
        res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render("login")
    }
    catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    const userData = await User.findOne({ email: req.body.email });
    if (userData) {
        const passwordMatch = bcrypt.compare(req.body.password, userData.password);
        if (passwordMatch) {
            if (userData.is_Admin === 0) {


                res.render("login", { message: "email and password are incorrect" })
            }
            else {

                req.session.user_id = userData._id;
                res.redirect("/admin/home")
            }
        }
    }
    else {

        res.render("login", { message: "email and password are incorrect" })
    }
}

const loadHome = async (req, res) => {
    const userData = await User.findOne({ _id: req.session.user_id })
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render("home", { userData })
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin")
}

const adminDashboard = async (req, res) => {
    const users = await User.find({ is_Admin: 0 })

    res.render("dashboard", { users })
};


const newUserLoad = (req, res) => {
    res.header('Cache-Control', 'no-store')
    res.render("new-user")
}

const addUser = async (req, res) => {
    const password = "default123"
    const spassword = await bcrypt.hash(password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mno,
        password: spassword,
        is_Admin: 0,

    })
    const userData = await user.save();
    if (userData) {
        res.redirect("/admin/dashboard")
    }
    else {
        res.render("new-user", { message: "something went wrong" });
    }
}

const editUserLoad = async (req, res) => {
    const user = await User.findOne({ _id: req.query.id });
    
    res.render("edit-user", { user })
}

const updateUsers = async (req, res) => {
    const user = await User.findByIdAndUpdate({ _id: req.body.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,

        }

    });
    res.redirect("/admin/dashboard")
}

const deleteUser = async (req, res) => {
    const id = req.query.id;
    await User.deleteOne({ _id: id });
    res.redirect("/admin/dashboard")
}

const searchUser = async (req, res) => {
    const search = req.body.searchValue;
    const regex = new RegExp(search, 'i');
    const userName = await User.findOne({ name: { $regex: regex } });
    if (userName) {
        res.render("userSearch", { userName })
    }


    else {
        res.render("404")
    }

}

module.exports = {
    loginLoad,
    verifyLogin,
    loadHome,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser,
    searchUser

}

