const User = require("../models/userModel");
const Task = require("../models/taskList");
const bcrypt = require("bcrypt");

const getIndex = async (req, res) => {
    try {
        const tasks = await Task.find().populate("user", "username");
        res.render("index", { tasks });
    } catch (err) {
        console.log(err);
        res.render("index", { tasks: [] });
    }
};

const getRegister = (req, res) => {
    res.render("register");
}

const postRegister = async (req, res) => {
    try {
        const { name, username, email, password, role } = req.body;

        const userExit = await User.findOne({ email });

        if (userExit) {
            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.redirect("/login");
        console.log("User registered successfully");
    } catch (err) {
        console.log("Error in postRegister: ", err);
        return res.redirect("/register");
    }
}

const getLogin = (req, res) => {
    res.render("login");
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "User not found");
            res.redirect("/login");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Invalid password");
            res.redirect("/login");
        }
        res.cookie("User_Id", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        res.redirect("/");
    } catch (err) {
        console.log("Error in postLoging", err);
        res.redirect("/login");
    }
}

const getLogout = (req, res) => {
    res.clearCookie("User_Id");
    res.redirect("/login");
}

module.exports = { getIndex, getRegister, postRegister, getLogin, postLogin, getLogout }