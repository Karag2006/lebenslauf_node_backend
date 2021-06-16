const mongoose = require("mongoose");
const User = require('./models/User')

mongoose.set("useCreateIndex", true);

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



module.exports = db;