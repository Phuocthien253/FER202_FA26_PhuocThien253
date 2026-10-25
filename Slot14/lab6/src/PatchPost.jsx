
import { useState } from "react";
import postApi from "./api/postApi";

function PatchPost() {
  const [postId, setPostId] = useState("1");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handlePatch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");
    setResult(null);

    try {
      const response = await postApi.patch(postId, { title })

      setResult(response.data);
      setMessage("Cập nhật một phần bài viết thành công!");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi PATCH bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Patch Post (PATCH)</h2>

      <form onSubmit={handlePatch}>
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
            placeholder="Nhập tiêu đề cần cập nhật"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật tiêu đề"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {result && (
        <div>
          <h3>Kết quả từ API:</h3>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Tiêu đề:</strong> {result.title}</p>
          <p><strong>Nội dung:</strong> {result.body ?? "(API không trả về trường body)"}</p>
        </div>
      )}
    </section>
  );
}

export default PatchPost;
