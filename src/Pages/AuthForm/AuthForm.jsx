import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AuthForm.css";
import axios from "axios";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const [registerError, setRegisterError] = useState("");
  const password = watch("password", "");

  // Form toggle function
  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset(); // reset form fields when toggling
  };

  // Authentication Form submission handler
  const onSubmit = async (data) => {
    if (isLogin) {
      console.log("Login data:", data);
    } else {
      console.log(data.username);
      try {
        data.password = String(data.password);
        if (data.confirm_password !== undefined) {
          data.confirm_password = String(data.confirm_password);
        }
        
        let userCheckResponse = await axios.get(`http://localhost:5000/api/user-check?username=${data.username}`);

        if (userCheckResponse.data.user_data != null) {
          setRegisterError("User already exists. Please login.");
          console.log("User already exists:", userCheckResponse.data.user_data);
        }
        else {
          const response = await axios.post("http://localhost:5000/api/register", data);
          if (response.status === 200) {
            console.log("Registration successful:", response.data);
          }
        }

      } catch (error) {
        setRegisterError("Registration failed. Please try again.");
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Your Username"
              {...register("username", { required: true })}
            />
            {errors.username && <span className="error">Username is required</span>}
          </div>


          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("fullName")}
              />
              {errors.fullName && <span className="error">Full Name is required</span>}
            </div>
          )}

          {!isLogin && (
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>
          )}
          {!isLogin && (
            <div className="input-group">
              <label>Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("profile_image")}
              />
              {errors.profile_image && <span className="error">Profile image is required</span>}
            </div>
          )}
          {!isLogin && (
            <div className="input-group">
              <label>Gender</label>
              <select {...register("gender", { required: !isLogin })}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error">Gender is required</span>}
            </div>

          )}

          {!isLogin && (
            <div className="input-group">
              <label>Contact Number</label>
              <input
                type="tel"
                placeholder="Your Contact Number"
                {...register("contact_number", { required: !isLogin })}
              />
              {errors.contact_number && <span className="error">Contact number is required</span>}
            </div>

          )}

          {!isLogin && (
            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Your Address"
                {...register("address", { required: !isLogin })}
              />
              {errors.address && <span className="error">Address is required</span>}
            </div>

          )}


          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="error">Password is required</span>}
          </div>
          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("confirm_password", {
                  required: true,
                  validate: value =>
                    value === password || "Passwords do not match"
                })}
              />
              {errors.confirm_password && (
                <span className="error">
                  {errors.confirm_password.message || "Confirm Password is required"}
                </span>
              )}
            </div>
          )}

          <button type="submit" className="btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}