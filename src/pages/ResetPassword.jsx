import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Password strength logic
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) return "Strong";
    return "Medium";
  };

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    // ✅ SAME VALIDATION AS REGISTER
    if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(newPassword)) {
      toast.error("Password must be 6+ chars, include 1 uppercase & 1 number");
      return;
    }

    try {

      await API.post("/users/reset-password", {
        email,
        otp,
        newPassword
      });

      toast.success("Password reset successful");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b]">

      {/* Glass Card */}
      <div className="w-[420px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-900/40">

        <h2 className="text-4xl text-white text-center tracking-wide font-sacramento">
          Reset Password
        </h2>

        <p className="text-center text-gray-300 mb-6 text-sm">
          Enter OTP and new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* OTP */}
          <div>
            <label className="text-sm text-gray-300">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm text-gray-300">New Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* 🔥 Strength Indicator */}
            {newPassword && (
              <p
                className={`text-xs mt-2 ${
                  strength === "Strong"
                    ? "text-green-400"
                    : strength === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                Strength: {strength}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-1">
              Must be 6+ chars, include 1 uppercase & 1 number
            </p>
          </div>

          <p className="text-xs text-gray-400">
            OTP is valid for 5 minutes.
          </p>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium tracking-wide transition-all duration-300 
            bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg"
          >
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
}

export default ResetPassword;