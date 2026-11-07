import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function usePostData() {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch all posts
  useEffect(() => {
    let isMounted = true;

    const getPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/post`, {
          withCredentials: true,
        });

        if (isMounted) {
          setPosts(response.data);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        if (isMounted) {
          setIsLoadingPosts(false);
        }
      }
    };

    getPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch logged-in user's profile
  useEffect(() => {
    let isMounted = true;

    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/profile/view`,
          { withCredentials: true }
        );

        if (isMounted) {
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    getProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    posts,
    setPosts,
    isLoadingPosts,
    currentUser,
  };
}