// client/src/Signup.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteTitle from "./SiteTitle";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "SimpleShelf - Sign Up";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ background: "linear-gradient(135deg, #012A2D, #435355)" }}
    >
      <SiteTitle />

      <div
        className="border-2 rounded-lg p-8 w-full max-w-md bg-white shadow-lg"
        style={{ borderColor: "#012A2D" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#012A2D" }}>
          Sign Up
        </h2>

        <input type="text" name="username" placeholder="Username" className="border w-full p-2 rounded mb-3 bg-white placeholder-gray-500 text-black" style={{ borderColor: "#435355" }} onFocus={(e) => (e.target.style.borderColor = "#012A2D")} onBlur={(e) => (e.target.style.borderColor = "#435355")} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="border w-full p-2 rounded mb-3 bg-white placeholder-gray-500 text-black" style={{ borderColor: "#435355" }} onFocus={(e) => (e.target.style.borderColor = "#012A2D")} onBlur={(e) => (e.target.style.borderColor = "#435355")} onChange={handleChange} />
        <input type="text" name="mobile" placeholder="Mobile No" className="border w-full p-2 rounded mb-3 bg-white placeholder-gray-500 text-black" style={{ borderColor: "#435355" }} onFocus={(e) => (e.target.style.borderColor = "#012A2D")} onBlur={(e) => (e.target.style.borderColor = "#435355")} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border w-full p-2 rounded mb-3 bg-white placeholder-gray-500 text-black" style={{ borderColor: "#435355" }} onFocus={(e) => (e.target.style.borderColor = "#012A2D")} onBlur={(e) => (e.target.style.borderColor = "#435355")} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="border w-full p-2 rounded mb-4 bg-white placeholder-gray-500 text-black" style={{ borderColor: "#435355" }} onFocus={(e) => (e.target.style.borderColor = "#012A2D")} onBlur={(e) => (e.target.style.borderColor = "#435355")} onChange={handleChange} />

        <button
          className="w-full py-2 rounded font-bold transition-all duration-300"
          style={{
            backgroundColor: "#012A2D",
            color: "white",
            border: "2px solid #012A2D",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "#012A2D";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#012A2D";
            e.target.style.color = "white";
          }}
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-black">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#012A2D" }} className="hover:underline">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
