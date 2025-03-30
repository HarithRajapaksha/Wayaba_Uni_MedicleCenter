import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WayambaLogo from "../images/wayamba.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form's default submission behavior

    // Data object to send
    const SendData = {
      userName: userName,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:3005/api/auth/login", SendData);
      localStorage.setItem('token', response.data.token);
      console.log("Login Success", response.data.userFind.role);

      if (response.data.userFind.role === "Admin") {
        navigate("/AdminSend");
      }
      else if (response.data.userFind.role === "Nurse") {
        navigate("/AdminSend");
      }else if (response.data.userFind.role === "Pharmacist") {
        navigate("/show-medicine");
      }else if (response.data.userFind.role === "Doctor") {
        navigate("/DoctorGetInfo");
      }

    
    } catch (error) {
      console.error("Login Error", error.response ? error.response.data : error.message);

       Swal.fire({
                      title: "Please Cheak Your Credentials",
                      text: "Login Fail",
                      icon: "error",
                    }).then(() => {
                      // Optional: Clear form or perform other actions
                    }); 
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0d6efd" }}
    >
      <div
        className="container rounded shadow-lg bg-white d-flex flex-column flex-md-row overflow-hidden"
        style={{ width: "70%" }}
      >
        {/* Left Section */}
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white p-4"
          style={{ backgroundColor: "#0d6efd", flex: 1 }}
        >
          <h3>Welcome to Medical Center</h3>
          <img
            src={WayambaLogo}
            alt="Wayamba Logo"
            className="mt-3"
            style={{ width: "150px", height: "auto" }}
          />
        </div>

        {/* Right Section */}
        <div className="p-5 flex-grow-1" style={{ flex: 1 }}>
          <h2 className="text-center mb-4">WELCOME!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-50">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
