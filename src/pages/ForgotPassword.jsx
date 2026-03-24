import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import loginImage from "../assets/loginImage.png";

function ForgotPassword(){

 const [email,setEmail] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {

    e.preventDefault();
   
    if (!email) {
     toast.error("Please enter email");
     return;
    }
   
    try {
   
     const res = await API.post(`/users/forgot-password?email=${email}`);
   
     toast.success("OTP sent to your email. It is valid for 5 minutes.");
        
     navigate("/reset-password", { state: { email } });
   
    } catch (err) {
   
     toast.error("User not found");
   
    }
   
   };

   return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b]">
  
      {/* Glass Card */}
      <div className="w-[420px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-900/40">
  
        {/* Heading */}
        <h2 className="text-4xl text-white text-center tracking-wide font-sacramento">
          Forgot Password
        </h2>
  
        <p className="text-center text-gray-300 mb-6 text-sm">
          Enter your email to receive OTP
        </p>
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
  
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium tracking-wide transition-all duration-300 
            bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg"
          >
            Send OTP
          </button>
          <p
  className="text-center text-sm text-blue-400 mt-4 cursor-pointer hover:underline"
  onClick={() => navigate("/login")}
>
  Back to Login
</p>
        </form>
  
      </div>
    </div>
  );

}

export default ForgotPassword;

