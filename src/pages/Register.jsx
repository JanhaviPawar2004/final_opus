import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import loginImage from "../assets/loginImage.png";
import { FaUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !name.trim()) {
      toast.error("Please fill required fields");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
      toast.error("Password must be 6+ chars, include 1 uppercase & 1 number");
      return;
    }

    setLoading(true); // ✅ start loading

    try {
      await API.post("/users/register", {
        email,
        password,
        name,
        address
      });

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // ✅ stop loading
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
          Create Account
        </h2>
  
        <p className="text-center text-gray-300 mb-6 text-sm">
          Register to continue
        </p>
  
        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
  
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
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
            <label className="text-sm text-gray-300">Password</label>
  
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
  
            <p className="text-xs text-gray-400 mt-2">
              Must be 6+ chars, include 1 uppercase & 1 number
            </p>
          </div>
  
          {/* Address */}
          <div>
            <label className="text-sm text-gray-300">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
  
        {/* Login */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?
          <span
            className="text-blue-400 ml-1 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
