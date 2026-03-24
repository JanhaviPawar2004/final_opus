import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import loginImage from "../assets/loginImage.png";
import { FaUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 🔹 prevent multiple clicks

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
  
    if (loading) return;
    setLoading(true);
  
    try {
      const res = await API.post("/users/login", { email, password });
  
      const token = res.data?.token;
  
      if (!token) {
        throw new Error(res.data?.message || "Invalid credentials");
      }
  
      localStorage.setItem("token", token);
      toast.success("Login Successful");
  
      const user = jwtDecode(token);
  
      if (user.role?.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
  
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b]">
      
      {/* Glass Card */}
      <div className="w-[420px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-900/40">
        
        {/* Icon */}
        <div className="flex justify-center text-4xl text-white mb-4">
          <FaUser />
        </div>
  
        {/* Heading */}
        <h2 className="text-4xl text-white text-center tracking-wide font-sacramento">
          Welcome Back
        </h2>
  
        <p className="text-center text-gray-300 mb-6 text-sm">
          Sign in to continue
        </p>
  
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
  
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>
  
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
  
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
  
          {/* Forgot Password */}
          <div className="text-right">
            <p
              className="text-sm text-blue-300 cursor-pointer hover:underline transition"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>
          </div>
  
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium tracking-wide transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]"
            } text-white shadow-lg`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
  
        {/* Register */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?
          <span
            className="text-blue-400 ml-1 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
