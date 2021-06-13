/*  Requires:
*
*   MongoDB Database named lebenslauf complete with an admin user for it.
*   Credentials saved in .env
*
*/

// Requirements : 
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Database Connection using .env File
mongoose.connect(process.env.DATABASE_URL, {
    auth: { authdb: "admin" },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json())

const viewRouter = require('./routes/lebenslauf')
app.use("/lebenslauf", viewRouter)

app.listen(3000, () => console.log("Server Started on Port 3000"));
