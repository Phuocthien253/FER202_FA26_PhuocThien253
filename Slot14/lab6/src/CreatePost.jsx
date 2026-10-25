
import { useState } from "react";
import postApi from "./api/postApi";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await postApi.create({ title, body, userId: 1 })

      setMessage(`Tạo bài viết thành công! ID: ${response.data.id}`);
      setTitle("");
      setBody("");
    } catch (err) {
      setMessage(`Lỗi: ${err.message || "Không thể tạo bài viết."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tạo bài viết</h2>

      <form onSubmit={handleCreate}>
        <div>
          <label>Tiêu đề: </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nội dung: </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo bài viết"}
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default CreatePost;
