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
    <div className="h-screen flex items-center justify-center bg-cover bg-center">
      <div className="flex w-[900px] h-[620px] bg-white shadow-2xl overflow-hidden">
        <div className="w-1/2 relative">
          <img
            src={loginImage}
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="w-4/5">
            <div className="flex justify-center text-4xl text-gray-500 mb-4">
              <FaUser />
            </div>

            <h2 className="text-5xl text-blue-400 text-center mb-3 font-sacramento">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleLogin}>
              <label className="text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-3 rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full border p-3 pr-10 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded text-white transition ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p
              className="text-sm text-blue-500 cursor-pointer mb-4"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <p className="text-center mt-6 text-sm">
              Don’t have an account?
              <span
                className="text-blue-500 cursor-pointer ml-1"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;