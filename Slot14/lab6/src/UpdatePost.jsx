
import { useState } from "react";
import postApi from "./api/postApi";

function UpdatePost() {
  const [postId, setPostId] = useState("1");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");
    setResult(null);

    try {
      const response = await postApi.update(postId, { id: Number(postId), title, body, userId: 1 })

      setResult(response.data);
      setMessage("Cập nhật bài viết thành công!");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi cập nhật bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Update Post (PUT)</h2>

      <form onSubmit={handleUpdate}>
        <div>
          <label>ID bài viết: </label>
          <input
            type="number"
            min="1"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tiêu đề mới: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề mới"
            required
          />
        </div>

        <div>
          <label>Nội dung mới: </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Nhập nội dung mới"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật bài viết"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {result && (
        <div>
          <h3>Kết quả từ API:</h3>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Tiêu đề:</strong> {result.title}</p>
          <p><strong>Nội dung:</strong> {result.body}</p>
          <p><strong>User ID:</strong> {result.userId}</p>
        </div>
      )}
    </section>
  );
}

export default UpdatePost;
