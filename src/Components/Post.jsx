import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import PostCard from "./PostCard";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

const getAvatarColor = (id) => {
  if (!id) return avatarColors[0];
  const sum = id
    .toString()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[sum % avatarColors.length];
};

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [justPostedId, setJustPostedId] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:7777/post", {
          withCredentials: true,
        });

        console.log("Posts:", response.data);
        setPosts(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/profile/view",
          { withCredentials: true },
        );

        console.log("Current User Response:", response.data);
        setCurrentUser(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setPostError(null);
    setIsPosting(true);
    try {
      const response = await axios.post(
        "http://localhost:7777/post",
        { title, content },
        { withCredentials: true },
      );

      console.log("Created Post:", response.data);

      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setJustPostedId(response.data._id);
      setTimeout(() => setJustPostedId(null), 2000);

      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setPostError(
        err.response?.data?.message ||
          err.response?.data ||
          "Couldn't publish your post. Try again.",
      );
    } finally {
      setIsPosting(false);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post,
      ),
    );
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const composerColor = getAvatarColor(currentUser?._id);

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#2B2A28]">Posts</h1>
          <p className="mt-2 text-sm text-[#756F68]">
            Share what you're building with the community
          </p>
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-3xl bg-white p-6 shadow-xl shadow-[#E8624F]/10"
        >
          {postError && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-xl border border-[#C4483D]/30 bg-[#C4483D]/10 px-3 py-2.5 text-sm text-[#C4483D]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{postError}</span>
            </div>
          )}

          <div className="flex gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: composerColor }}
            >
              {currentUser?.firstName?.[0]}
              {currentUser?.lastName?.[0]}
            </div>

            <div className="flex-1 space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPosting}
                className="w-full rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm font-semibold text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
              />

              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPosting}
                rows={3}
                className="w-full resize-none rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8A8178]">
                  {content.length} characters
                </span>

                <button
                  type="submit"
                  disabled={isPosting}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#E8624F] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Posting…
                    </>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Feed */}
        {isLoadingPosts ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-[#EAE1D3] bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#F3E9DC]" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded bg-[#F3E9DC]" />
                    <div className="h-2 w-16 rounded bg-[#F3E9DC]" />
                  </div>
                </div>
                <div className="mt-4 h-4 w-1/2 rounded bg-[#F3E9DC]" />
                <div className="mt-2 h-3 w-full rounded bg-[#F3E9DC]" />
                <div className="mt-1 h-3 w-2/3 rounded bg-[#F3E9DC]" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-sm text-[#8A8178]">
            No posts yet — be the first to share something.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                userId={currentUser?._id}
                isNew={post._id === justPostedId}
                onPostUpdated={handlePostUpdated}
                onPostDeleted={handlePostDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}