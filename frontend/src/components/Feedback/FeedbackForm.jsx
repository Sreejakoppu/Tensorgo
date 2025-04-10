import React, { useState } from "react";
import axios from "axios";
import FeedbackList from "./FeedbackList";
import Navbar from "../../common/Navbar/Navbar";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [category, setCategory] = useState("Product Features Queries");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const token = userInfo?.token;

    try {
      await axios.post(
        "http://localhost:8080/feedback/submit",
        { category, rating, comments },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Feedback submitted successfully.");
      setRating(0);
      setComments("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Error submitting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="form-container">
        <h2 className="form-title">Submit Feedback</h2>

        <form onSubmit={handleSubmit} className="feedback-form">
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              <option value="General Queries">General Queries</option>
              <option value="Product Features Queries">
                Product Features Queries
              </option>
              <option value="Product Pricing Queries">
                Product Pricing Queries
              </option>
              <option value="Product Feature Implementation Requests">
                Product Feature Implementation Requests
              </option>
            </select>
          </div>
          {category !== "General Queries" && (
            <div className="form-group">
              <label>Rating (1-5):</label>
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="form-input"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Comments:</label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      <div className="list-wrapper">
        <FeedbackList category={category} />
      </div>
    </>
  );
};

export default FeedbackForm;
