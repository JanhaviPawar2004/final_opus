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
    <div className="h-screen flex items-center justify-center bg-cover bg-center">
      <div className="flex w-[900px] h-[620px] bg-white shadow-2xl overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-4/5">

            <div className="flex justify-center text-4xl text-gray-500 mb-4">
              <FaUser/>
            </div>

            <h2 className="text-5xl text-blue-400 text-center mb-3 font-sacramento">
              Create Account
            </h2>

            <p className="text-center text-gray-500 mb-6">
              Register to access the platform
            </p>

            <form onSubmit={handleRegister}>

              {/* NAME */}
              <label className="text-sm">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border p-1 rounded mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* EMAIL */}
              <label className="text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-1 rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* PASSWORD */}
              <label className="text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-2">
  <input
    type={showPassword ? "text" : "password"} // toggle type
    placeholder="Enter password"
    className="w-full border p-1 rounded pr-10" // add padding-right for icon
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
<p className="text-xs text-gray-400 mb-3">
  Must be 6+ chars, include 1 uppercase & 1 number
</p>

              {/* ADDRESS */}
              <label className="text-sm">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full border p-1 rounded mb-4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={loading} // ✅ disable while loading
                className={`w-full p-3 rounded text-white transition ${
                  loading ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-500"
                }`}
              >
                {loading ? "Registering..." : "Register"} {/* ✅ change text */}
              </button>
            </form>

            <p className="text-center mt-6 text-sm">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer ml-1"
              >
                Login
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;