import { useEffect, useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartId } = location.state || {};

  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!cartId) navigate("/cart");
  }, [cartId, navigate]);

  const fetchCart = async () => {
    try {
      const res = await API.get("/ecommerce/carts/my-summary");
      setCart(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCart(); }, []);

  const handlePlaceOrder = async () => {
    if (loading) return;
    if (!address.trim()) {
      toast.warning("Please enter delivery address");
      return;
    }
  
    setLoading(true);
  
    try {
      // 1️⃣ Create Order
      const res = await API.post("/orders/create", {
        cartId: cart.cartId,
        address,
        paymentMethod,
      });
      const order = res.data;
  
      // 2️⃣ Handle payment method
      if (paymentMethod === "COD") {
        toast.success("Order placed successfully");
        navigate("/orders", { state: { success: true, orderId: order.id } });
      } else {
        // Online payment
        const paymentRes = await API.post(
            "/payment/create",
            {
              orderId: order.id,
              cartId: cart.cartId,
              amount: order.totalPrice,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`  // token from localStorage
              }
            }
          );
        // Redirect to Stripe checkout
        toast.success("Redirecting to payment...");
        window.location.href = paymentRes.data.checkoutUrl;

      

      
      }
    } 
    catch (err) {
      console.error(err);
      toast.error("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return (
    <div className="min-h-screen bg-[#060d1a] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Preparing your checkout…</p>
    </div>
  );

  const deliveryFee = cart.subtotal > 499 ? 0 : 50;
  const total = cart.total + deliveryFee;
  const steps = ["Delivery", "Payment", "Confirm"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b] relative overflow-hidden px-4 py-8 pb-16">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.4s ease both; }
        .fade-up-2 { animation: fadeUp 0.4s 0.1s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.2s ease both; }
        .textarea-custom:focus {
          border-color: rgba(59,130,246,0.55);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
          outline: none;
        }
        .textarea-custom::placeholder { color: #334155; }
        .pay-tile { transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
        .pay-tile:hover { transform: translateY(-2px); }
        .cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(37,99,235,0.5);
        }
        .cta-btn:not(:disabled):active { transform: translateY(0px); }
        .items-scroll::-webkit-scrollbar { width: 3px; }
        .items-scroll::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 4px; }
      `}</style>

      
      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between mb-8 flex-wrap gap-3 fade-up">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Cart
          </button>

          <div className="flex items-center gap-3">
            <span className="text-3xl">🛒</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-none">Checkout</h1>
              <p className="text-slate-500 text-xs mt-1">
                {cart.items?.length} item{cart.items?.length !== 1 ? "s" : ""} · Secure &amp; Encrypted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-950/50 border border-green-800/40 px-3 py-1.5 rounded-full">
            
          </div>
        </header>

        {/* ── STEP INDICATOR ── */}
        <div className="flex items-center justify-center mb-8 fade-up-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer select-none transition-all duration-300
                  ${step > i + 1
                    ? "bg-green-600 text-white"
                    : step === i + 1
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                    : "bg-[#1e2d4a] text-slate-500"}`}
              >
                {step > i + 1
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  : i + 1}
              </div>
              <span className={`text-xs font-medium ${step === i + 1 ? "text-slate-200" : "text-slate-600"}`}>{s}</span>
              {i < 2 && (
                <div className={`w-10 h-0.5 rounded-full mx-1 transition-all duration-300 ${step > i + 1 ? "bg-blue-600" : "bg-[#1e2d4a]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">

          {/* LEFT */}
          <div className="flex flex-col gap-5">

            {/* ADDRESS CARD */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 hover:border-blue-400/40 rounded-2xl p-6 transition-all duration-300 fade-up-2">              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">Delivery Address</h2>
                  <p className="text-slate-500 text-s mt-0.5">Where should we send your order?</p>
                </div>
              </div>

              <textarea
                rows={4}
                placeholder="House no, Street, Area, City, State, Pincode…"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (step === 1 && e.target.value.length > 10) setStep(2);
                }}
                className="textarea-custom w-full bg-white/[0.04] border border-blue-900/30 rounded-xl px-4 py-3 text-slate-200 text-sm leading-relaxed resize-y transition-all duration-200"
              />

              {address.trim().length > 0 && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span className="text-green-400 text-s font-medium">Address confirmed</span>
                </div>
              )}
            </div>

            {/* PAYMENT CARD */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 hover:border-blue-400/40 rounded-2xl p-6 transition-all duration-300 fade-up-3">              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">Payment Method</h2>
                  <p className="text-slate-500 text-s mt-0.5">Choose how you'd like to pay</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-5">
                {/* COD */}
                <div
                  onClick={() => { setPaymentMethod("COD"); setStep(3); }}
                  className={`pay-tile relative flex items-center gap-4 rounded-xl px-4 py-3.5 cursor-pointer border
                    ${paymentMethod === "COD"
                      ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                      : "bg-white/[0.03] border-white/[0.07] hover:border-blue-900/60"}`}
                >
                  {paymentMethod === "COD" && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                  )}
                  <span className="text-2xl leading-none">💵</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-100">Cash on Delivery</p>
                    <p className="text-s text-slate-500 mt-0.5">Pay when your order arrives</p>
                  </div>
                 
                </div>

                {/* ONLINE */}
                <div
                  onClick={() => { setPaymentMethod("ONLINE"); setStep(3); }}
                  className={`pay-tile relative flex items-center gap-4 rounded-xl px-4 py-3.5 cursor-pointer border
                    ${paymentMethod === "ONLINE"
                      ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                      : "bg-white/[0.03] border-white/[0.07] hover:border-blue-900/60"}`}
                >
                  {paymentMethod === "ONLINE" && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                  )}
                  <span className="text-2xl leading-none">⚡</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-100">Online Payment</p>
                    <p className="text-s text-slate-500 mt-0.5"> Stripe</p>
                  </div>
                 
                </div>
              </div>

             
            </div>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div className="fade-up-3">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 lg:sticky lg:top-6 shadow-lg shadow-blue-900/20">
              <h2 className="text-base font-bold text-slate-100 mb-5">Order Summary</h2>

              {/* Items */}
              <div className="items-scroll flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1 mb-1">
                {cart.items?.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="shrink-0 w-5 h-5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <span className="text-l text-slate-400 truncate">{item.productName}</span>
                    </div>
                    <span className="text-s font-semibold text-slate-200 shrink-0">₹{item.lineTotal}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/[0.06] my-4" />

              {/* Price breakdown */}
              <div className="flex flex-col gap-2.5 mb-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-sm text-slate-200 font-medium">₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-400">Discount</span>
                  <span className="text-sm text-green-400 font-medium">−₹{cart.discountAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Delivery</span>
                  <span className={`text-sm font-medium ${deliveryFee === 0 ? "text-green-400" : "text-slate-200"}`}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-[11px] text-green-400 bg-green-950/40 border border-green-800/30 rounded-lg px-3 py-2 text-center">
                     Free delivery on orders above ₹499
                  </p>
                )}
              </div>

              <div className="h-px bg-white/[0.06] my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-base font-bold text-slate-100">Total</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                  ₹{total}
                </span>
              </div>

              {/* CTA button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || !address.trim()}
                className="cta-btn w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_8px_28px_rgba(37,99,235,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {!address.trim() && (
                <p className="text-center text-slate-600 text-s mt-2.5">↑ Add a delivery address to continue</p>
              )}

              {/* Trust row */}
              <div className="flex justify-around mt-5 pt-4 border-t border-white/[0.05]">
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "↩️", label: "Returns" },
                  { icon: "📦", label: "Fast Ship" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-base">{icon}</span>
                    <span className="text-[10px] text-slate-600 font-medium">{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}