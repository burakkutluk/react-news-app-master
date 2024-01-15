import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    axios
      .get("http://localhost:3002/users/getUser")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
  });

  return <div>Home</div>;
};

export default Home;
