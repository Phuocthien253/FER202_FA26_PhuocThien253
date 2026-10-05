import {
  useCart,
  useCartDispatch,
} from "../contexts/CartContext";

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  if (items.length === 0) {
    return <p>Giỏ hàng trống.</p>;
  }

  return (
    <div>
      <h3>Giỏ hàng</h3>

      {items.map((item) => (
        <div key={item.id}>
          {item.name} x {item.qty}{" "}

          <button
            onClick={() =>
              dispatch({
                type: "ADD",
                payload: item,
              })
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "DECREASE",
                payload: item.id,
              })
            }
          >
            -
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                payload: item.id,
              })
            }
          >
            Xoá
          </button>
        </div>
      ))}

      <p>
        <b>
          Tổng:{" "}
          {total.toLocaleString("vi-VN")}đ
        </b>
      </p>

      <button
        onClick={() =>
          dispatch({
            type: "CLEAR",
          })
        }
      >
        Xoá hết
      </button>
    </div>
  );
}