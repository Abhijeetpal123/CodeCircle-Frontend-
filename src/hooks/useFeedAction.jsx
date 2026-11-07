import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";

export default function useFeedActions(setUsers) {
  const [requestLoading, setRequestLoading] = useState(null);

  const handleRequest = async (status, toUserId) => {
    try {
      setRequestLoading(toUserId);

      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );

      // Remove the user from the feed after the action succeeds.
      setUsers((prev) => prev.filter((user) => user._id !== toUserId));

      if (status === "interested") {
        toast.success("Connection request sent!");
      } else {
        toast("User ignored", { icon: "👋" });
      }
    } catch (err) {
      console.error("Connection request failed:", err);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setRequestLoading(null);
    }
  };

  return { requestLoading, handleRequest };
}