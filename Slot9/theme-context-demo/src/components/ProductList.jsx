import { products } from "../data/products";
import { useCartDispatch } from "../contexts/CartContext";

export default function ProductList() {
  const dispatch = useCartDispatch();

  return (
    <div>
      <h3>Sản phẩm</h3>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} —{" "}
          {product.price.toLocaleString("vi-VN")}đ{" "}

          <button
            onClick={() =>
              dispatch({
                type: "ADD",
                payload: product,
              })
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}