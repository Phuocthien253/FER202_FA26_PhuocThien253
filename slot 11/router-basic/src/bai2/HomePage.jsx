
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1>Thư viện FPT University</h1>

      <p>
        Chào mừng bạn đến với hệ thống thư viện FPT!
      </p>

      <Link to="/books" className="btn btn-primary">
        Xem danh sách sách
      </Link>
    </div>
  );
}
