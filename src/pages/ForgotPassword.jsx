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

 return(

 <div className="h-screen flex items-center justify-center">

  <div className="flex w-[900px] h-[620px] bg-white shadow-2xl overflow-hidden">

   {/* LEFT IMAGE */}

   <div className="w-1/2">
    <img
     src={loginImage}
     alt="forgot"
     className="w-full h-full object-cover"
    />
   </div>

   {/* FORM */}

   <div className="w-1/2 flex items-center justify-center">

    <div className="w-4/5">

     <h2 className="text-5xl text-blue-400 text-center mb-3 font-sacramento">
      Forgot Password
     </h2>

     <p className="text-center text-gray-500 mb-8">
      Enter your email to receive OTP
     </p>

     <form onSubmit={handleSubmit}>

      <label>Email</label>

      <input
       type="email"
       placeholder="Enter your email"
       className="w-full border p-3 rounded mb-6"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
      />

      <button className="w-full bg-blue-400 text-white p-3 rounded hover:bg-blue-500">
       Send OTP
      </button>

     </form>

    </div>

   </div>

  </div>

 </div>

 );

}

export default ForgotPassword;