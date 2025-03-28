const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "social-login" },
  category: String,
  rating: Number,
  comments: String,
});



module.exports = mongoose.model("Feedback", FeedbackSchema);
