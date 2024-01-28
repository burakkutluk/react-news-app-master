import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import login from "../Images/login.jpeg";
import NavBar from "../NavBar/NavBar";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  // // Redirect to dashboard if user is already logged in.
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/users/login")
  //     .then((result) => {
  //       if (result.data.loggedIn === true) {
  //         navigate("/users/home");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .post("http://localhost:3002/users/login", { email, password })
  //     .then((result) => {
  //       if (result.data.loggedIn === true) {
  //         navigate("/users/home");
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }

  //show and hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/users/login", { email, password })
      .then((result) => {
        console.log(result);
        if ((result.status = "OK")) {
          //Add token local storage
          localStorage.setItem("token", result.data.token);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.error(err));
  };

  //hide navbar
  useEffect(() => {
    document.querySelector(".navbar").style.display = "none";
  }, []);

  

  return (
    <>
    <div className="center">
      {/* image add */}
      <div className="imgcontainer">
        <img src={login} alt="imageLogin" className="imageLogin" />
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Login</h1>

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
            type={passwordShown ? "text" : "password"}
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fa fa-${
              passwordShown ? "eye" : "eye-slash"
            } password-icon`}
            id="password-icon"
            onClick={togglePasswordVisiblity}
          ></i>

          <span></span>
          <label>Password</label>
        </div>

        <input type="submit" value="Login" />

        <div className="signup_link">
          Not a Member?<a href="/login/register"> Sign Up </a>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
