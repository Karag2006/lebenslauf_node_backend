/*  Requires:
*
*   MongoDB Database named "lebenslauf" complete with an admin user for it.
*   Credentials saved in .env File
*
*/

// Requirements : 
require("dotenv").config();


// const fs = require("fs");
const http = require("http");
// const https = require("https");
const express = require("express");
const cors = require('cors');
const app = express();
require ('./dbConnect')

app.use(cors())
app.use(express.json())

const viewRouter = require('./routes/lebenslauf/view')
app.use("/lebenslauf", viewRouter)

const adminRouter = require("./routes/lebenslauf/admin");
app.use("/lebenslauf/admin", adminRouter);

const httpServer = http.createServer(app);

httpServer.listen(process.env.HTTP_PORT, () => console.log("HTTP Server Started on Port " + process.env.HTTP_PORT));
