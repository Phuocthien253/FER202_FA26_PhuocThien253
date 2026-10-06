import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ShopHeader from "./components/ShopHeader";

import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ShopHeader />

          <div className="container">
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/products"
                element={<ProductList />}
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/"
                element={
                  <Navigate
                    to="/products"
                    replace
                  />
                }
              />

              <Route
                path="*"
                element={
                  <Navigate
                    to="/products"
                    replace
                  />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}