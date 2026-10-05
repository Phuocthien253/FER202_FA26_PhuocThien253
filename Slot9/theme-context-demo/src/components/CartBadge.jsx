import { useCart } from "../contexts/CartContext";

export default function CartBadge() {
  const { items } = useCart();

  const count = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <span>
      🛒 Giỏ hàng ({count})
    </span>
  );
}