
import { useState } from "react";
import axios from "axios";

function RequestConfig() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleRequest = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _limit: 5,
            _sort: "id",
            _order: "asc",
          },
          timeout: 10000,
          headers: {
            Accept: "application/json",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Yêu cầu đã hết thời gian chờ.");
      } else {
        setError(err.message || "Không thể lấy dữ liệu từ API.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Axios Request Config</h2>

      <p>Ví dụ cấu hình params, timeout và headers trong Axios.</p>

      <button onClick={handleRequest} disabled={loading}>
        {loading ? "Đang tải..." : "Gửi request"}
      </button>

      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      {result && (
        <div>
          <h3>Kết quả ({result.length} bài viết):</h3>

          {result.map((post) => (
            <article key={post.id}>
              <h4>{post.id}. {post.title}</h4>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RequestConfig;
