import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie'; // Import useCookies

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  
  const [, setCookie] = useCookies(['authToken']); // Initialize the cookies

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg, isAdmin, authToken) => {
    toast.success(msg, {
      position: "bottom-left",
    });
    setCookie('authToken', authToken, {path: '/'});
    if (isAdmin) {
      setTimeout(() => {
        navigate('/welcome/admin');
      }, 1000);
    } else {
      setTimeout(() => {
        navigate('/welcome/user');
      }, 1000);
    }
  };

//  const [, setCookie] = useCookies(['authToken']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, isAdmin, authToken } = data;
      if (success) {
        // Set the authToken cookie on successful login
        setCookie('authToken', authToken, { path: '/' });
        //console.log(authToken);
        handleSuccess(message, isAdmin);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <center>
      <br />
      <br />
      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </center>
  );
};

export default Login;
