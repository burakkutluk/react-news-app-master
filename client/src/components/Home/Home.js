import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // get token from local storage
    const token = localStorage.getItem("token");
    // if token is not present, redirect to login page
    if (!token) {
      navigate("/login");
    }else{
      console.log(token);
    }
  }, []);

  return <div>Home</div>;
};

export default Home;
