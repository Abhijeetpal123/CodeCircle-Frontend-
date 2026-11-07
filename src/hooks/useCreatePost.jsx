import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useCreatePost(setPosts) {
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [justPostedId, setJustPostedId] = useState(null);

  const handleCreatePost = async ({ title, content, resetForm }) => {
    if (!title.trim() || !content.trim()) return;

    setPostError(null);
    setIsPosting(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/post`,
        { title, content },
        { withCredentials: true }
      );

      setPosts((prevPosts) => [response.data, ...prevPosts]);

      setJustPostedId(response.data._id);

      setTimeout(() => {
        setJustPostedId(null);
      }, 2000);

      resetForm();
    } catch (err) {
      console.error(err.response?.data || err.message);

      setPostError(
        err.response?.data?.message ||
          err.response?.data ||
          "Couldn't publish your post. Try again."
      );
    } finally {
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    postError,
    justPostedId,
    handleCreatePost,
  };
}