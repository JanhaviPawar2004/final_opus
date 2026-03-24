import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment cancelled");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060d1a] text-white px-4">
      
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 mb-4">
        <span className="text-3xl">❌</span>
      </div>

      <h1 className="text-xl font-semibold text-red-400">
        Payment Cancelled
      </h1>

      <p className="text-slate-400 text-sm mt-2 text-center">
        Don’t worry, no money was deducted. You can try again anytime.
      </p>

      <button
        onClick={() => navigate("/cart")}
        className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition"
      >
        Go Back to Cart
      </button>
    </div>
  );
}