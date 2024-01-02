import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/users/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data == "Success") {
          navigate("/");
          
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
          <label>Email</label>
        </div>

        <div className="txt_field">
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
          <label>Password</label>
        </div>

        <div className="pass">Forgot Password?</div>

        <input type="submit" value="Login" />

        <div className="signup_link">
          Not a Member?<a href="/login/register"> Sign Up </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
