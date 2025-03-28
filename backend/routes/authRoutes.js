const express = require('express');
const Router = express.Router();
const { googleAuth, userAuth } = require('../controllers/authController');
const checkToken = require("../middleware/checkToken");
Router.get("/google", googleAuth);
Router.post("/userLogin",userAuth);
module.exports = Router;