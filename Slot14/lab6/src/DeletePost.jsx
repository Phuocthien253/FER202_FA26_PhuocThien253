
import { useState } from "react";
import postApi from "./api/postApi";

function DeletePost() {
  const [postId, setPostId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deletedPost, setDeletedPost] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa bài viết ID ${postId}?`
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");
    setDeletedPost(null);

    try {
      const response = await postApi.remove(postId)

      setDeletedPost(response.data);
      setMessage(`Đã gửi yêu cầu xóa bài viết ID ${postId} thành công.`);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi xóa bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Delete Post (DELETE)</h2>

      <form onSubmit={handleDelete}>
        <label>ID bài viết cần xóa: </label>
        <input
          type="number"
          min="1"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Đang xóa..." : "Xóa bài viết"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {deletedPost && (
        <div>
          <h3>Phản hồi từ API:</h3>
          <pre>{JSON.stringify(deletedPost, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

export default DeletePost;
