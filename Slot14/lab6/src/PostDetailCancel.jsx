
import { useEffect, useRef, useState } from "react";
import postApi from "./api/postApi";

export default function PostDetailCancel() {
  const [postId, setPostId] = useState("1");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  const loadPost = async () => {
    // Hủy request trước nếu nó vẫn đang chạy
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError("");
    setPost(null);

    try {
      const response = await postApi.getById(postId, {
        signal: controller.signal,
      });

      setPost(response.data);
    } catch (err) {
      if (err.code === "ERR_CANCELED" || err.name === "CanceledError") {
        console.log("Request đã bị hủy.");
      } else {
        setError(err.message || "Không tải được bài viết.");
      }
    } finally {
      if (controllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  const cancelRequest = () => {
    controllerRef.current?.abort();
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return (
    <section>
      <h2>NC4 - AbortController</h2>

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
        <button onClick={loadPost} disabled={loading}>
          Tải bài viết
        </button>

        <button onClick={cancelRequest}>
          Hủy request
        </button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {post && (
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>ID: {post.id}</p>
        </article>
      )}
    </section>
  );
}
