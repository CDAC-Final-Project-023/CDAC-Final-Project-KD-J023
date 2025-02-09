import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../components/navbar/BetaNav";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const ResetPassword = () => {
//   const [step, setStep] = useState(1); 
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [generatedOTP, setGeneratedOTP] = useState(""); // Store mock OTP
//   const navigate = useNavigate();

//   const generateMockOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email) {
//       toast.error("Please enter your email address!");
//       return;
//     }

//     // Mock sending OTP
//     const otp = generateMockOTP();
//     setGeneratedOTP(otp);
//     console.log("Mock OTP:", otp); // For testing purposes, log the OTP
//     toast.success("OTP sent to your email!");
//     setStep(2);
//   };

//   const handleOTPSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.otp) {
//       toast.error("Please enter the OTP!");
//       return;
//     }

//     // Mock OTP verification
//     if (formData.otp !== generatedOTP) {
//       toast.error("Invalid OTP!");
//       return;
//     }

//     toast.success("OTP verified!");
//     setStep(3);
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.newPassword || !formData.confirmPassword) {
//       toast.error("Please fill out both password fields!");
//       return;
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     // Mock password update
//     toast.success("Password reset successfully!");
//     setTimeout(() => navigate("/login"), 1500);
//   };

//   return (
//     <div
//       className="container-fluid vh-100 d-flex align-items-center justify-content-center"
//       style={{
//         backgroundImage: "url('https://via.placeholder.com/1920x1080')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <Navbar />
//       <div
//         className="row shadow-lg bg-white rounded overflow-hidden"
//         style={{
//           width: "90%",
//           maxWidth: "500px",
//           animation: "fadeIn 1s ease-in-out",
//         }}
//       >
//         <div className="col-12 p-4">
//           <h2 className="text-center mb-3">
//             {step === 1 && "Reset Your Password"}
//             {step === 2 && "Verify OTP"}
//             {step === 3 && "Set New Password"}
//           </h2>

//           {/* Step 1: Request Email */}
//           {step === 1 && (
//             <form onSubmit={handleEmailSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">
//                 Send OTP
//               </button>
//             </form>
//           )}

//           {/* Step 2: Verify OTP */}
//           {step === 2 && (
//             <form onSubmit={handleOTPSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="otp" className="form-label">
//                   Enter OTP
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="otp"
//                   name="otp"
//                   placeholder="Enter the OTP sent to your email"
//                   value={formData.otp}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">
//                 Verify OTP
//               </button>
//             </form>
//           )}

//           {/* Step 3: Set New Password */}
//           {step === 3 && (
//             <form onSubmit={handlePasswordSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="newPassword" className="form-label">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="newPassword"
//                   name="newPassword"
//                   placeholder="Enter new password"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="confirmPassword" className="form-label">
//                   Confirm New Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   placeholder="Confirm new password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">
//                 Reset Password
//               </button>
//             </form>
//           )}

//           <p className="text-center mt-3">
//             Remembered your password?{" "}
//             <a
//               href="/login"
//               className="text-primary"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate("/login");
//               }}
//             >
//               Log in
//             </a>
//           </p>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ResetPassword;


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/passwordReset/reset", null, {
        params: { token, newPassword: password },
      });
      setMessage(response.data);
    }  catch (error) {
      setMessage("Error: " + (error.response?.data || "Something went wrong"));
    }
  };

  return (
    <div>
      <h2>Set New Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
