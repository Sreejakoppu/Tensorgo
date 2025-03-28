import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackList from "./FeedbackList";
import "./FeedbackForm.css";
import Navbar from "../../common/Navbar/Navbar";

const FeedbackForm = () => {
  const [category, setCategory] = useState("Product Features");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [feedbackData, setFeedbackData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          // withCredentials: true,
        }
      );
      // alert("Feedback submitted successfully.");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      // setError("Error submitting feedback.");
    }
  };

  return (
    <>
      
      <form onSubmit={handleSubmit}>
        {error && <div>Error: {error}</div>}
        <label className="m-3">
          Category:
          <select
            className="border border-black p-1 px-2 m-1 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Product Features">Product Features</option>
            <option value="Product Pricing">Product Pricing</option>
            <option value="Product Usability">Product Usability</option>
          </select>
        </label>
        <label className="m-3">
          Rating:
          <input
            className="border border-black p-1 px-2 m-1 rounded"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label className="m-3">
          Comments:
          <textarea
            className="border border-black p-1 px-2 m-1 rounded"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </label>
        <button
          type="submit"
          className="m-5 border border-black p-1 px-2 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </>
  );
};

export default FeedbackForm;
