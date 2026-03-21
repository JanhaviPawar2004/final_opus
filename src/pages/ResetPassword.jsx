import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import loginImage from "../assets/loginImage.png";

function ResetPassword(){

 const location = useLocation();
 const navigate = useNavigate();

 const email = location.state?.email;

 const [otp,setOtp] = useState("");
 const [newPassword,setNewPassword] = useState("");

 const handleSubmit = async(e)=>{
  e.preventDefault();

  if(!otp || !newPassword){
   toast.error("Please fill all fields");
   return;
  }

  try{

   await API.post("/users/reset-password",{
    email,
    otp,
    newPassword
   });

   toast.success("Password reset successful");

   navigate("/login");

  }catch(err){

    toast.error(err.response?.data?.message || "Invalid OTP");
  }

 };

 return(

 <div className="h-screen flex items-center justify-center">

  <div className="flex w-[900px] h-[620px] bg-white shadow-2xl overflow-hidden">

   {/* LEFT IMAGE */}

   <div className="w-1/2">
    <img
     src={loginImage}
     alt="reset"
     className="w-full h-full object-cover"
    />
   </div>

   {/* FORM */}

   <div className="w-1/2 flex items-center justify-center">

    <div className="w-4/5">

     <h2 className="text-5xl text-blue-400 text-center mb-3 font-sacramento">
      Reset Password
     </h2>

     <p className="text-center text-gray-500 mb-6">
      Enter OTP and new password
     </p>

     <form onSubmit={handleSubmit}>

      <label>OTP</label>

      <input
       type="text"
       placeholder="Enter OTP"
       className="w-full border p-3 rounded mb-4"
       value={otp}
       onChange={(e)=>setOtp(e.target.value)}
      />

      <label>New Password</label>

      <input
       type="password"
       placeholder="Enter new password"
       className="w-full border p-3 rounded mb-6"
       value={newPassword}
       onChange={(e)=>setNewPassword(e.target.value)}
      />

      <button className="w-full bg-blue-400 text-white p-3 rounded hover:bg-blue-500">
       Reset Password
      </button>

      <p className="text-sm text-gray-500 mb-3">
OTP is valid for 5 minutes.
</p>
     </form>

    </div>

   </div>

  </div>

 </div>

 );

}

export default ResetPassword;