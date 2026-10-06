import { useEffect, useState } from "react";
import axios from "axios";

import { useCartDispatch } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const API_URL = "http://localhost:3001";

export default function ProductList() {
  const dispatch = useCartDispatch();
  const { isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products`
        );

        setProducts(response.data);
      } catch (err) {
        console.error(
          "Không thể tải sản phẩm:",
          err
        );

        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      return;
    }

    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  return (
    <div>
      <h3>Sản phẩm</h3>

      {!isAuthenticated && (
        <p style={{ color: "red" }}>
          Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.
        </p>
      )}

      {products.map((product) => (
        <div
          key={product.id}
          style={{ marginBottom: "10px" }}
        >
          <span>
            {product.name} —{" "}
            {product.price.toLocaleString("vi-VN")}đ
          </span>

          {" "}

          <button
            disabled={!isAuthenticated}
            onClick={() =>
              handleAddToCart(product)
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}