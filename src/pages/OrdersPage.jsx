import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

const STATUS_CONFIG = {
  PENDING:    { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", dot: "bg-yellow-400", label: "Pending" },
  CONFIRMED:  { color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/30",   dot: "bg-blue-400",   label: "Confirmed" },
  PROCESSING: { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400", label: "Processing" },
  SHIPPED:    { color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   dot: "bg-cyan-400",   label: "Shipped" },
  DELIVERED:  { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/30",  dot: "bg-green-400",  label: "Delivered" },
  CANCELLED:  { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/30",    dot: "bg-red-400",    label: "Cancelled" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status?.toUpperCase()] || STATUS_CONFIG.PENDING;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label || status}
    </span>
  );
}

function OrderCard({ order }) {
  const itemCount = order.items?.reduce((s, i) => s + i.quantity, 0) || 0;
  const paymentIcon = order.paymentMethod === "COD" ? "💵" : "⚡";

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 hover:border-blue-400/40 rounded-2xl overflow-hidden transition-all duration-200 fade-up">

      {/* Card top bar — colored by status */}
      <div className={`h-0.5 w-full ${STATUS_CONFIG[order.status?.toUpperCase()]?.dot || "bg-blue-500"}`} />

      <div className="p-5">

        {/* ── ROW 1: Order ID + Status + Amount ── */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Order</span>
              <span className="text-sm font-bold text-blue-300">#{order.id}</span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {new Date(order.orderDate).toLocaleString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <StatusBadge status={order.status} />
            <span className="text-lg font-extrabold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              ₹{order.totalPrice}
            </span>
          </div>
        </div>

        {/* ── META CHIPS ── */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
          
          {order.address && (
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1 max-w-[200px] truncate">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {order.address}
            </span>
          )}
        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-white/[0.06] mb-4" />

        {/* ── ITEMS LIST (always visible) ── */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Items</p>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Product icon placeholder */}
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-sm">
                  🛍️
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-slate-200 font-medium truncate">{item.productName}</p>
                  <p className="text-xs text-slate-500">Qty: {item.quantity} × ₹{item.price}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-200 shrink-0">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* ── FOOTER: total breakdown ── */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-between items-center">
          <span className="text-xs text-slate-500">{itemCount} item{itemCount !== 1 ? "s" : ""} total</span>
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-100">
            Total:
            <span className="text-blue-400">₹{order.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const success = location.state?.success;
  const orderId = location.state?.orderId;

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    if (success) window.history.replaceState({}, document.title);
  }, [success]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b] px-4 py-8 pb-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-delay { animation: fadeUp 0.4s 0.08s ease both; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-down { animation: slideDown 0.35s ease both; }
      `}</style>

      

      <div className="max-w-3xl mx-auto relative z-10">

        {/* ── SUCCESS BANNER ── */}
        {success && showBanner && (
          <div className="slide-down mb-5 flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-green-500/30 bg-green-500/10">
            <div className="flex items-center gap-2.5">
              <div>
                <p className="text-sm font-semibold text-green-300">Order placed successfully!</p>
                {orderId && <p className="text-xs text-green-500 mt-0.5">Order #{orderId} is being processed</p>}
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-green-600 hover:text-green-300 transition-colors shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-7 fade-up">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">My Orders</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {loading ? "Loading…" : `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Shop More
          </button>
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Fetching your orders…</p>
          </div>
        )}

        {/* ── EMPTY ── */}
        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 fade-up">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-4xl">
              🛒
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-semibold text-lg">No orders yet</p>
              <p className="text-slate-500 text-sm mt-1">Your placed orders will appear here</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Start Shopping →
            </button>
          </div>
        )}

        {/* ── ORDERS GRID ── */}
        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-4 fade-up-delay">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}