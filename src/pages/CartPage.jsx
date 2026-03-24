import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const token = localStorage.getItem("token");

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please login first 🚫");
      navigate("/login");
    }
  }, [token, navigate]);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const res = await API.get("/ecommerce/carts/my-summary");
      setCart(res.data);
      setSelectedCoupon(res.data.couponName || null);
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  // ================= FETCH COUPONS =================
  const fetchCoupons = async () => {
    try {
      const res = await API.get("/ecommerce/carts/coupons");
      setCoupons(res.data || []);
    } catch (err) {
      console.error("Coupon error:", err);
      setCoupons([]);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchCoupons();
  }, []);

  // ================= UPDATE QUANTITY =================
  const updateQty = async (productId, qty) => {
    if (qty <= 0) return removeItem(productId);

    try {
      await API.put(`/ecommerce/carts/${cart.cartId}/items/${productId}/quantity`, {
        quantity: qty,
      });
      fetchCart();
    } catch (err) {
      console.error("Update qty error:", err);
    }
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (productId) => {
    try {
      await API.delete(`/ecommerce/carts/${cart.cartId}/items/${productId}`);
      fetchCart();
      toast.success("Item removed 🗑");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // ================= APPLY COUPON =================
  const applyCoupon = async (coupon) => {
    try {
      await API.put(`/ecommerce/carts/${cart.cartId}/coupon`, {
        couponName: coupon.code,
        discountPercent: coupon.discountPercent,
      });
      setSelectedCoupon(coupon.code);
      fetchCart();
      toast.success("Coupon applied 🎉");
    } catch (err) {
      console.error("Coupon apply error:", err);
      toast.info("Coupon removed");
    }
  };

  // ================= REMOVE COUPON =================
  const clearCoupon = async () => {
    try {
      await API.delete(`/ecommerce/carts/${cart.cartId}/coupon`);
      setSelectedCoupon(null);
      fetchCart();
    } catch (err) {
      console.error("Remove coupon error:", err);
    }
  };

  // ================= LOADING =================
  if (!cart) return <div className="p-6 text-white">Loading...</div>;

  // ================= EMPTY CART =================
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
        <h2 className="text-2xl mb-4">🛒 Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  // ================= CALCULATIONS =================
  const deliveryFee = (cart.subtotal || 0) > 499 ? 0 : 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <h1 className="text-3xl font-bold mb-6 tracking-wide">
          🛒 Your Cart
        </h1>

        {/* ================= ITEMS ================= */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr_1fr_80px] gap-2 items-center bg-white/10 backdrop-blur-md p-3 rounded-xl hover:scale-[1.01] transition"
            >
              <div className="w-[50px] h-[50px] bg-blue-200/30 rounded-lg flex items-center justify-center text-xs">
                Img
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  {item.productName}
                </h2>
                <p className="text-[10px] text-gray-200">
                  Premium product description
                </p>
              </div>

              {/* QTY */}
              <div className="flex justify-center gap-1">
                <button
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded"
                  onClick={() => updateQty(item.productId, item.quantity - 1)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded"
                  onClick={() => updateQty(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-center">₹{item.unitPrice}</div>
              <div className="text-center">₹{item.lineSubtotal}</div>

              {/* DISCOUNT */}
              <div className="text-center text-green-300">
                {cart.discountPercent > 0
                  ? `-₹${item.lineDiscount || 0}`
                  : ""}
              </div>

              <div className="text-center font-semibold text-blue-200">
                ₹{item.lineTotal}
              </div>

              <div className="text-right">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-300 hover:text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= COUPONS ================= */}
        <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">
            🎟 Available Coupons
          </h2>

          <div className="flex gap-3 flex-wrap">
            {coupons.map((c) => {
              const now = new Date();
              const isExpired = new Date(c.expiryDate) < now;

              const eligible =
                (cart.subtotal || 0) >= c.minCartValue &&
                !isExpired &&
                c.status === "ACTIVE";

              const isSelected = selectedCoupon === c.code;

              return (
                <div
                  key={c.id}
                  onClick={() => eligible && applyCoupon(c)}
                  className={`p-3 rounded-xl text-xs w-[180px] border transition cursor-pointer relative ${isSelected
                    ? "bg-green-400 text-black scale-105"
                    : eligible
                      ? "bg-blue-400/20 hover:bg-blue-400/40 border-blue-300"
                      : "bg-gray-400/20 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  <p className="font-bold">{c.code}</p>
                  <p>{c.description}</p>
                  <p>{c.discountPercent}% OFF</p>

                  {!eligible && (
                    <p className="text-[10px] mt-1 text-red-300">
                      Add ₹{c.minCartValue - (cart.subtotal || 0)} more
                    </p>
                  )}
                </div>
              );
            })}

            {cart.discountPercent > 0 && (
              <button
                onClick={clearCoupon}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-xs"
              >
                Clear Coupon
              </button>
            )}
          </div>
        </div>

        {/* ================= DELIVERY ================= */}
        <div className="mt-4">
          {deliveryFee === 0 ? (
            <p className="text-green-300 font-semibold">
              🎉 Free Delivery Unlocked!
            </p>
          ) : (
            <p>Delivery Fee: ₹50</p>
          )}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="mt-6 bg-white/10 backdrop-blur-md p-5 rounded-xl flex justify-between items-center">
          <div>
            <p>Subtotal: ₹{cart.subtotal}</p>
            <p className="text-green-300">
              Discount: ₹{cart.discountAmount}
            </p>
            <p>Delivery: ₹{deliveryFee}</p>

            <p className="text-xl font-bold text-blue-200">
              Total: ₹{cart.total + deliveryFee}
            </p>
          </div>

          <button
           onClick={() => setShowCheckoutModal(true)}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            Checkout →
          </button>
          
        </div>
        {showCheckoutModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white text-black p-6 rounded-xl w-[320px] text-center shadow-xl">
      
      <h2 className="text-lg font-semibold mb-3">
        Confirm Checkout
      </h2>

      <p className="text-sm mb-5">
        Do you want to proceed to payment?
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowCheckoutModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setShowCheckoutModal(false);
            navigate("/checkout", {
              state: { cartId: cart.cartId },
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Yes, Proceed
        </button>
      </div>

    </div>
  </div>
)}
      </div>
    </div>
  );
}