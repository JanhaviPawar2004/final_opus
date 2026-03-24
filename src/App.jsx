import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// 🔹 Pages (User)
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryProducts";
import ShowProductDetails from "./pages/ShowProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

// 🔹 Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// 🔹 Admin
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";

// 🔹 Payment
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

// 🔹 Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./AdminLayout";
import ProtectedRoute from "../ProtectedRoute";


// 🏠 MAIN LAYOUT (Navbar + Footer)
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />  {/* ✅ only once */}
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

function App() {

  // 🔥 Keep your state (not removing anything)
  const [product, setProduct] = useState(null);

  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage setProduct={setProduct} />
            </MainLayout>
          }
        />

        <Route
          path="/categories/:id/products"
          element={
            <MainLayout>
              <CategoryPage setProduct={setProduct} />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ShowProductDetails product={product} />
            </MainLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          }
        />

        {/* ================= AUTH ================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= ADMIN ================= */}

        <Route element={<ProtectedRoute isAdmin={true} />}>

          <Route path="/admin" element={<AdminLayout />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="add-category" element={<AddCategory />} />

          </Route>

          {/* Payment callbacks */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;