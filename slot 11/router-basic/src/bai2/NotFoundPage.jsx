
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h1>404 - Không tìm thấy trang</h1>

      <p>Đường dẫn bạn truy cập không tồn tại.</p>

      <Link to="/" className="btn btn-outline-primary">
        Về trang chủ
      </Link>
    </div>
  );
}
