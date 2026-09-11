import axios from "axios";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

// Same author always gets the same color, even across different posts in the feed
const getAvatarColor = (id) => {
  if (!id) return avatarColors[0];
  const sum = id
    .toString()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[sum % avatarColors.length];
};

const CONTENT_PREVIEW_LENGTH = 240;

export default function PostCard({
  post,
  userId,
  isNew,
  onPostUpdated,
  onPostDeleted,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isOwner = post.createdBy?._id === userId;
  const color = getAvatarColor(post.createdBy?._id);

  const isLongPost = post.content.length > CONTENT_PREVIEW_LENGTH;
  const displayContent =
    isExpanded || !isLongPost
      ? post.content
      : `${post.content.slice(0, CONTENT_PREVIEW_LENGTH)}…`;

  const handleEdit = async () => {
    setIsSaving(true);
    try {
      const response = await axios.patch(
        `http://localhost:7777/post/${post._id}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Updated Post:", response.data);

      onPostUpdated(response.data.data);
      setEditMode(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:7777/post/${post._id}`,
        {
          withCredentials: true,
        },
      );

      console.log("Deleted Post:", response.data);

      onPostDeleted(post._id);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="rounded-2xl border border-l-4 border-[#EAE1D3] bg-white p-6 transition-shadow duration-1000"
      style={{
        borderLeftColor: color,
        boxShadow: isNew ? `0 0 0 3px ${color}66` : "none",
      }}
    >
      {editMode ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isSaving}
            className="w-full rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm font-semibold text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
          />

          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={isSaving}
            rows={3}
            className="w-full resize-none rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(false)}
              disabled={isSaving}
              className="flex-1 rounded-full border border-[#EAE1D3] px-5 py-2 text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              disabled={isSaving}
              className="flex-1 rounded-full bg-[#E8624F] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {post.createdBy?.firstName?.[0]}
                {post.createdBy?.lastName?.[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-[#2B2A28]">
                  {post.createdBy?.firstName} {post.createdBy?.lastName}
                </p>
                {post.createdAt && (
                  <p className="text-xs text-[#8A8178]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {isOwner && (
              <div className="flex gap-1">
                <button
                  onClick={() => setEditMode(true)}
                  aria-label="Edit post"
                  className="rounded-lg p-2 text-[#8A8178] transition hover:bg-[#F3E9DC] hover:text-[#5B8C6E]"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  aria-label="Delete post"
                  className="rounded-lg p-2 text-[#8A8178] transition hover:bg-[#C4483D]/10 hover:text-[#C4483D] disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#2B2A28]">
            {post.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#756F68]">
            {displayContent}
          </p>
          {isLongPost && (
            <button
              onClick={() => setIsExpanded((expanded) => !expanded)}
              className="mt-1 text-xs font-semibold text-[#5B8C6E] hover:underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}