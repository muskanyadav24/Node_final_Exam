const express = require("express");
const router = express.Router();
const { getCreateTask, getAllTasks, getMyTasks, postCreateTask, getEditTask, postEditTask, getDeleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/create", authMiddleware, getCreateTask);
router.post("/create", authMiddleware, postCreateTask);

router.get("/allTasks", authMiddleware, getAllTasks);
router.get("/myTasks", authMiddleware, getMyTasks);

router.get("/editTask/:id", authMiddleware, getEditTask);
router.post("/editTask/:id", authMiddleware, postEditTask);

router.get("/deleteTask/:id", authMiddleware, getDeleteTask);
 
module.exports = router;
