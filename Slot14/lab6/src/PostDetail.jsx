
import { useState } from "react";
import postApi from "./api/postApi";
import userApi from "./api/userApi";

export default function PostDetail() {
  const [postId, setPostId] = useState("1");
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timing, setTiming] = useState(null);
  const [comparison, setComparison] = useState("");

  const loadDetail = async () => {
    setLoading(true);
    setError("");
    setComparison("");
    setPost(null);
    setUser(null);
    setComments([]);

    const start = performance.now();

    try {
      // NC3: gọi 3 API song song
      const [postResponse, commentsResponse] = await Promise.all([
        postApi.getById(postId),
        postApi.getComments(postId),
      ]);

      const userResponse = await userApi.getById(
        postResponse.data.userId
      );

      setPost(postResponse.data);
      setComments(commentsResponse.data);
      setUser(userResponse.data);
      setTiming((performance.now() - start).toFixed(0));
    } catch (err) {
      setError(err.message || "Không thể tải chi tiết bài viết.");
    } finally {
      setLoading(false);
    }
  };

  const compareRequests = async () => {
    setLoading(true);
    setError("");
    setComparison("");

    const start = performance.now();

    try {
      // Promise.allSettled vẫn nhận kết quả của các request
      // ngay cả khi một request thất bại
      const results = await Promise.allSettled([
        postApi.getById(postId),
        postApi.getComments(postId),
        userApi.getById(1),
      ]);

      const elapsed = (performance.now() - start).toFixed(0);

      const summary = results
        .map((result, index) => {
          const names = ["Post", "Comments", "User"];
          return `${names[index]}: ${
            result.status === "fulfilled" ? "Thành công" : "Thất bại"
          }`;
        })
        .join(" | ");

      setComparison(`${summary} | Tổng thời gian: ${elapsed} ms`);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>NC3 - Post Detail</h2>

      <label>
        ID bài viết:{" "}
        <input
          type="number"
          min="1"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
      </label>

      <div>
        <button onClick={loadDetail} disabled={loading}>
          {loading ? "Đang tải..." : "Tải chi tiết"}
        </button>

        <button onClick={compareRequests} disabled={loading}>
          So sánh Promise.allSettled
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {comparison && <p>{comparison}</p>}

      {post && (
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>Post ID: {post.id}</p>
          <p>Thời gian tải: {timing} ms</p>

          {user && (
            <div>
              <h3>Tác giả</h3>
              <p>{user.name} ({user.email})</p>
            </div>
          )}

          <h3>Bình luận</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <strong>{comment.name}</strong>
              <p>{comment.body}</p>
              <hr />
            </div>
          ))}
        </article>
      )}
    </section>
  );
}
