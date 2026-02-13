const Task = require("../models/taskList");
const User = require("../models/userModel");

const getCreateTask = (req, res) => {
    res.render("create");
}

const postCreateTask = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Task.create({ title, content, user: req.user_id });
        res.redirect("/allTasks");
        console.log("Task created successfully");
    } catch (error) {
        console.log(error);
        res.redirect("/create");
    }
}

const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    res.render("allTasks", { tasks });
}

const getMyTasks = async (req, res) => {
    const tasks = await Task.find();
    res.render("myTasks", { tasks });
}

const getEditTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render("editTask", { task });
}

const postEditTask = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Task.findByIdAndUpdate(req.params.id, { title, content });
        res.redirect("/allTasks");
        console.log("Task updated successfully");
    } catch (error) {
        console.log(error);
        res.redirect("/editTask");
    }
}

const getDeleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/allTasks");
    console.log("Task deleted successfully");
}

module.exports = { getCreateTask, getAllTasks, getMyTasks, postCreateTask, getEditTask, postEditTask, getDeleteTask }