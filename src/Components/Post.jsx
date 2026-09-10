import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function Post() {
  const [posts, setPosts] = useState([]);

  console.log("Post component mounted");
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get("http://localhost:7777/post", {
          withCredentials: true,
        });
        console.log(response.data);
        console.log("Extracted:", response.data.data)
        setPosts(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    getPost();
    console.log("getPost called");
  }, []);

return (
  <div>
    <h1>Posts</h1>

    {posts.map((post) => (
     <PostCard post={post}/>
    ))}
  </div>
);
}
