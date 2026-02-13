const express = require("express");
const router = express.Router();
const { getIndex, getRegister, getLogin, postRegister, postLogin, getLogout } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getIndex);

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/logout", getLogout);

module.exports = router;