
import { useState } from "react";
import postApi from "./api/postApi";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await postApi.getAll({ _limit: 10 });
      setPosts(response.data);
      setSelectedIds([]);
    } catch (err) {
      setError(err.message || "Không tải được bài viết.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((post) => post.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      setMessage("Vui lòng chọn ít nhất một bài viết.");
      return;
    }

    const idsToDelete = [...selectedIds];

    if (!window.confirm(`Bạn có chắc muốn xóa ${idsToDelete.length} bài viết?`)) {
      return;
    }

    setDeleting(true);
    setError("");
    setMessage("");

    // Lưu dữ liệu ban đầu để có thể khôi phục nếu cần
    const previousPosts = [...posts];

    // Optimistic Update: xóa khỏi giao diện trước khi API phản hồi
    setPosts((currentPosts) =>
      currentPosts.filter((post) => !idsToDelete.includes(post.id))
    );
    setSelectedIds([]);

    try {
      const results = await Promise.allSettled(
        idsToDelete.map((id) => postApi.remove(id))
      );

      const failedIds = [];

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          failedIds.push(idsToDelete[index]);
        }
      });

      if (failedIds.length > 0) {
        // Khôi phục những bài viết xóa thất bại
        const failedPosts = previousPosts.filter((post) =>
          failedIds.includes(post.id)
        );

        setPosts((currentPosts) => {
          const existingIds = currentPosts.map((post) => post.id);
          return [
            ...currentPosts,
            ...failedPosts.filter((post) => !existingIds.includes(post.id)),
          ];
        });

        setMessage(
          `Xóa thành công ${idsToDelete.length - failedIds.length}/${idsToDelete.length} bài viết. Một số bài viết chưa xóa được.`
        );
      } else {
        setMessage(`Đã xóa thành công ${idsToDelete.length} bài viết.`);
      }
    } catch (err) {
      // Phòng trường hợp có lỗi ngoài dự kiến
      setPosts(previousPosts);
      setError(err.message || "Không thể xóa các bài viết.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section>
      <h2>Post List</h2>

      <button onClick={loadPosts} disabled={loading || deleting}>
        {loading ? "Đang tải..." : "Tải danh sách"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}

      {posts.length > 0 && (
        <div>
          <p>
            Đang chọn: {selectedIds.length} / {posts.length} bài viết
          </p>

          <label>
            <input
              type="checkbox"
              checked={
                posts.length > 0 && selectedIds.length === posts.length
              }
              onChange={toggleSelectAll}
              disabled={deleting}
            />
            Chọn tất cả
          </label>

          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0 || deleting}
          >
            {deleting ? "Đang xóa..." : `Xóa bài đã chọn (${selectedIds.length})`}
          </button>
        </div>
      )}

      {posts.map((post) => (
        <article
          key={post.id}
          style={{ borderBottom: "1px solid #ddd", padding: "12px 0" }}
        >
          <label>
            <input
              type="checkbox"
              checked={selectedIds.includes(post.id)}
              onChange={() => toggleSelect(post.id)}
              disabled={deleting}
            />
            Chọn bài viết
          </label>

          <h3>
            {post.id}. {post.title}
          </h3>
          <p>{post.body}</p>
        </article>
      ))}

      {!loading && posts.length === 0 && (
        <p>Chưa có bài viết. Nhấn “Tải danh sách” để tải dữ liệu.</p>
      )}
    </section>
  );
}
