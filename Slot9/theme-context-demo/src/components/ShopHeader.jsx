import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CartBadge from "./CartBadge";

export default function ShopHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "16px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link to="/products">
          Sản phẩm
        </Link>

        <Link to="/cart">
          <CartBadge />
        </Link>

        <div style={{ marginLeft: "auto" }}>
          {isAuthenticated ? (
            <>
              <span>
                Xin chào, <b>{user.username}</b>
              </span>

              {" "}

              <button onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}