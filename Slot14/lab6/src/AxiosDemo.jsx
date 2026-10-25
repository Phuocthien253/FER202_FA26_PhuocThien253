
import { useState } from "react";
import postApi from "./api/postApi";

function AxiosDemo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await postApi.getAll({ _limit: 10 });
      setPosts(response.data);
    } catch (err) {
      setError(err.message || "Không thể tải danh sách bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Axios Demo - API Client</h2>

      <button onClick={fetchPosts} disabled={loading}>
        {loading ? "Đang tải..." : "Tải bài viết"}
      </button>

      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      {loading && <p>Đang tải dữ liệu...</p>}

      {!loading && !error && posts.length === 0 && (
        <p>Nhấn nút để tải danh sách bài viết.</p>
      )}

      {posts.map((post) => (
        <article key={post.id}>
          <h3>
            {post.id}. {post.title}
          </h3>
          <p>{post.body}</p>
        </article>
      ))}
    </section>
  );
}

export default AxiosDemo;
