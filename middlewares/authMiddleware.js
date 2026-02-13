const authMiddleware = (req, res, next) => {
    const userId = req.cookies.User_Id;
    if (!userId) {
        return res.redirect("/login");
    }
    next();
}

module.exports = authMiddleware;
