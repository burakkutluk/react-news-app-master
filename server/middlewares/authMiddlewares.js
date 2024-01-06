import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const checkUser = async (req, res, next) => {

  try{
    const token = req.headers.authorization.split(" ")[1];
    let decodedData

    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET)
       
      req.userId = decodedData.id;
      
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub;
    }

    next()

  } catch(error) {
    console.log(error)
  }

};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/users/discovery");
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error,
    });
  }
};

export { authenticateToken, checkUser };