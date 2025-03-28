const Feedback = require("../models/feedback");
const axios = require("axios");

exports.submitFeedback = async (req, res) => {
  const { category, rating, comments } = req.body;
  console.log(req.user._id);
  const feedback = new Feedback({
    userId: req.user._id,
    category,
    rating,
    comments,
  });

  try {
    await feedback.save();
    // Optionally, send feedback to Frill.co
    await axios.post(
      "https://api.frill.co/v1/ideas",
      {
        category,
        rating,
        comments,
      },
      {
        headers: { Authorization: `Bearer ${process.env.FRILL_API_KEY}` },
      }
    );
    res.status(201).send("Feedback submitted successfully.");
  } catch (err) {
    // console.error("Error submitting feedback:", err);
    res.status(400).send(`Error submitting feedback: ${err.message}`);
  }
};

exports.getFeedbackByCategory = async (req, res) => {
  const { category } = req.params;
  const { _id } = req.user;

  console.log("_id & category", _id, category);

  try {
    const feedback = await Feedback.find({
      userId: _id, 
    });
    
    console.log(feedback);
    if (!feedback || feedback.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this category" });
    }

    res.status(200).json({data:feedback});
  } catch (err) {
    console.error("Error retrieving feedback:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
