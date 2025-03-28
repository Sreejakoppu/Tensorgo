import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = ({ category }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const token = userInfo?.token;

    try {
      const { data } = await axios.get(
        `http://localhost:8080/feedback/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedback(data.data || []);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError("Failed to load feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [category]);

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>{category} Feedback</h2>
        <button
          onClick={fetchFeedback}
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="feedback-list">
        {feedback.length === 0 ? (
          <div className="no-feedback">
            No feedback available for this category
          </div>
        ) : (
          feedback
            .filter((item) => item.category === category)
            .map((item) => (
              <div key={item._id} className="feedback-card">
                <div className="feedback-rating">
                  <span>Rating:</span>
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`star ${i < item.rating ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-value">{item.rating===null?0:item.rating}/5</span>
                </div>
                <div className="feedback-comments">
                  <p>{item.comments}</p>
                </div>
                <div className="feedback-meta">
                  <span className="feedback-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;

const styles = `
.feedback-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.feedback-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.refresh-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  background: #2980b9;
}

.refresh-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  background: #fdecea;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #e74c3c;
}

.feedback-list {
  display: grid;
  gap: 1rem;
}

.feedback-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.25rem;
  transition: transform 0.2s ease;
}

.feedback-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feedback-rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.feedback-rating span {
  font-weight: 500;
  color: #34495e;
}

.stars {
  display: flex;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star.filled {
  color: #f39c12;
}

.rating-value {
  margin-left: auto;
  font-weight: bold;
  color: #3498db;
}

.feedback-comments {
  margin-bottom: 0.75rem;
  color: #333;
  line-height: 1.5;
}

.feedback-meta {
  font-size: 0.85rem;
  color: #7f8c8d;
  text-align: right;
}

.no-feedback {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  background: #f5f5f5;
  border-radius: 8px;
}
`;

const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FeedbackList = ({ category }) => {
//   const [feedback, setFeedback] = useState();

//   // console.log(category);

//   const fetchFunc = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("user-info"));
//     const token = userInfo?.token;
//     try {
//       const data = await axios.get(
//         `http://localhost:8080/feedback/category/:${category}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           // withCredentials: true,
//         }
//       );
//       console.log(data.data.data);
//       setFeedback(data.data.data);
//     } catch (error) {
//       console.log("error occured in fetch data");
//     }
//   };

//   useEffect(() => {}, [feedback]);

//   return (
//     <div>
//       <h2 className="my-2 font-semibold m-2">{category} Feedback:</h2>
//       <ul>
//         {Array.isArray(feedback) ? (
//           feedback.map((item) => (
//             (item.category===category?
//             <li key={item?._id}>
//               <strong>Rating:</strong> {item?.rating} <br />
//               <strong>Comments:</strong> {item?.comments}
//             </li>
//             :[])
//           ))
//         ) : (
//           <li className="m-2">No feedback available</li>
//         )}
//       </ul>
//       <button onClick={fetchFunc}>Get Data</button>
//     </div>
//   );
// };

// export default FeedbackList;
