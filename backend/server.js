const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//Use the port 8070 or use any available port if it is not available.
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB connection Success!");
})

const blogRouter = require("./routes/blogRoutes.js");

app.use("/blog", blogRouter);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port no ${PORT}`);
})