
import PostList from "../PostList";
import { Link } from "react-router-dom";

export default function PostListPage() {
  return (
    <>
      <h2>Post List</h2>
      <p>
        <Link to="/posts/create">Tạo bài viết mới</Link>
      </p>
      <PostList />
    </>
  );
}
