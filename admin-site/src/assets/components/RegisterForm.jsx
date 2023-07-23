import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../store/action/ActionCreator"; // Import action creator

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addAdmin(userData))
      .then((admin) => {
        console.log("Admin added:", admin);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding admin:", error);
      });

    setUserData({
      username: "",
      email: "",
      password: "",
      role: "",
      phoneNumber: "",
      address: "",
    });
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Register Form</h1>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={userData.role} onChange={handleChange}>
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
