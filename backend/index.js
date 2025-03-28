const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();

const feedbackRoutes =require("./routes/feedback");

require("dotenv").config();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
require("./models/dbConnect");
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    optionsSuccessStatus: 200,
  })
);
app.get("/home", (req, res) => {
  return res.json("I am pavan");
});
app.use("/auth", authRoutes);
app.use("/feedback",feedbackRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
