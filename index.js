require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3001;
const connectDB = require("./db/db");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/taskRoute");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", authRoute);
app.use("/", postRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
