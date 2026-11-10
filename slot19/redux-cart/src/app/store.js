import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

const STORAGE_KEY = 'fer202_slot19_redux_cart';

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const items = saved ? JSON.parse(saved) : [];

    return {
      items: Array.isArray(items) ? items : []
    };
  } catch {
    return { items: [] };
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer
  },

  preloadedState: {
    cart: loadCart()
  }
});

store.subscribe(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(store.getState().cart.items)
  );
});