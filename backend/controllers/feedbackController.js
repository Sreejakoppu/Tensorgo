const Feedback = require("../models/feedback");
const axios = require("axios");
const client = require("../utils/intercom");
const User = require("../models/userModel");

exports.submitFeedback = async (req, res) => {
  const { category, rating, comments } = req.body;
  // console.log(req.user._id);
  const feedback = new Feedback({
    userId: req.user._id,
    category,
    rating,
    comments,
  });

  try {
    await feedback.save();
    console.log("reached here");
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");
    // console.log(user);

    let contact = null;
    const searchResults = await client.contacts.search({
      query: {
        field: "email",
        operator: "=",
        value: user.email,
      },
    });
    console.log("search :: ", searchResults.data);
    if (searchResults.data.length > 0) {
      contact = searchResults.data[0];
      console.log(contact.id);
      await client.contacts.update(contact.id, {
        custom_attributes: {
          category,
          rating,
        },
      });
    } else {
      contact = await client.contacts.create({
        role: "user",
        email: user.email,
        name: user.name,
        custom_attributes: {
          category,
          rating,
        },
      });
    }

    // Step 3: Create message
    await client.messages.create({
      message_type: "inapp",
      subject: "New Feedback Received",
      body: `Category: ${category}\nRating: ${rating}\nComments: ${comments}`,
      from: {
        type: "user", // ✅ Intercom expects 'user' here, not 'contact'
        email: user.email,
      },
    });

    console.log("hi reached");
    res.status(201).send("Feedback submitted successfully.");
  } catch (err) {
    console.error("Error submitting feedback:", err);
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

    // console.log(feedback);
    if (!feedback || feedback.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this category" });
    }

    res.status(200).json({ data: feedback });
  } catch (err) {
    console.error("Error retrieving feedback:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
