import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useRequestActions(setRequests) {
  const [reviewLoading, setReviewLoading] = useState(null);

  const handleReview = async (status, requestId) => {
    setReviewLoading(requestId);

    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      setRequests((prev) =>
        prev.filter((req) => req._id !== requestId)
      );
    } catch (err) {
      console.error("Failed to review request:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setReviewLoading(null);
    }
  };

  return { reviewLoading, handleReview };
}