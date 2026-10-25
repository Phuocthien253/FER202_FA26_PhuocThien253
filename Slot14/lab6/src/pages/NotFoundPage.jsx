
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p>Không tìm thấy trang bạn yêu cầu.</p>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
}
