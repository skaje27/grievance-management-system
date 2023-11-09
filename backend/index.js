const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute"); 
const complaintRoute = require("./Routes/complaintRoute");
const actionRoute = require("./Routes/actionRoute"); // Import the actionRoute
// const geocode = require('../util/geocode');
const { URI, PORT } = process.env;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/photo', express.static('photo'))

app.use("/", authRoute);

app.use("/complaints", complaintRoute);

app.use("/actions", actionRoute);

