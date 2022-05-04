const express = require("express");
const connectDB = require('../config/db')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { errorHandler } = require("../middleware/errorMiddleware")
const mongoose = require("mongoose")


const URL = process.env.MONGODB_URL;

mongoose.connect('mongodb+srv://newumal:Newumal123@cluster0.hpuxl.mongodb.net/STEM_CMS?retryWrites=true&w=majority')

let corsOptions = {
    origin: "http://localhost:4000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome STEM CMS" });
});

app.use('/api/goals', require('../routes/goalRoutes'))
app.use('/api/users', require('../routes/userRoutes'))

app.use(errorHandler)

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});