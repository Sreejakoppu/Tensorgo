const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
// const isAuthenticated = require("../middleware/isAuthenticated"); //
const auth = require("../middleware/checkToken");
router.post("/submit", auth , feedbackController.submitFeedback);
router.get("/category/:category", auth,feedbackController.getFeedbackByCategory);

module.exports = router;
