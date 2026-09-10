export default function PostCard({ post }) {
  console.log(post);
  return (
    <div>
      {post.title}
      {post.content}
      {post.firstName}
      {post.lastName}
    </div>
  );
}
