import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./index.css"

const Register = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmpassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/users/register', {name, email, password, confirmPassword})
    .then(result=> {console.log(result)
      navigate("/login")
    })
    .catch(err=> console.error(err))
  }

  return (
    <div className="center">
      <h1>Register</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" name="name" required onChange={(e)=> setName(e.target.value)}/>
          <span></span>
          <label>Name</label>
        </div>

        <div className="txt_field">
          <input type="email" name="email" required onChange={(e)=> setEmail(e.target.value)}/>
          <span></span>
          <label>Email</label>
        </div>

        <div className="txt_field">
          <input type="password" name="password" required onChange={(e)=> setPassword(e.target.value)}/>
          <span></span>
          <label>Password</label>
        </div>

        <div className="txt_field">
          <input type="password" name="confirmPassword" required onChange={(e)=> setConfirmpassword(e.target.value)}/>
          <span></span>
          <label>Confirm Password</label>
        </div>

        <div className="pass">Forgot Password?</div>

        <input type="submit" value="Sing Up" />

        <div className="signup_link">
          Already have a account?<a href="/login"> Login </a>
        </div>

      </form>
    </div>
  );
};

export default Register;
