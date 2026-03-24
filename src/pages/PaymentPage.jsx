import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartId = location.state?.cartId;
  const address = JSON.parse(localStorage.getItem("shippingAddress"));

  const handlePayment = async () => {
    try {
      if (!cartId) return alert("Cart missing");

      // 1. CALL BACKEND CHECKOUT
      const res = await API.post(`/ecommerce/orders/checkout/${cartId}`, {
        address: address
      });

      // 2. REDIRECT TO STRIPE
      window.location.href = res.data.checkoutUrl;

    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
      <div className="bg-white/10 p-6 rounded-xl text-center w-[350px]">

        <h2 className="text-xl font-bold mb-4">💳 Payment</h2>

        <p className="mb-2">Order is ready</p>

        <p className="text-sm mb-4">
          Deliver to: {address?.city}
        </p>

        <button
          onClick={handlePayment}
          className="bg-green-500 px-6 py-3 rounded w-full"
        >
          Pay with Stripe
        </button>

      </div>
    </div>
  );
}