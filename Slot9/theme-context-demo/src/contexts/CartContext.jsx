import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  cartReducer,
  initialCart,
} from "./cartReducer";

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

const CART_STORAGE_KEY = "cart";

function initCart() {
  try {
    const savedCart = localStorage.getItem(
      CART_STORAGE_KEY
    );

    return savedCart
      ? JSON.parse(savedCart)
      : initialCart;
  } catch (error) {
    console.error(
      "Không thể đọc giỏ hàng từ localStorage:",
      error
    );

    return initialCart;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    initCart
  );

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state)
    );
  }, [state]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartStateContext);

  if (context === null) {
    throw new Error(
      "useCart phải nằm trong <CartProvider>"
    );
  }

  return context;
}

export function useCartDispatch() {
  const context = useContext(
    CartDispatchContext
  );

  if (context === null) {
    throw new Error(
      "useCartDispatch phải nằm trong <CartProvider>"
    );
  }

  return context;
}