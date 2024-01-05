import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Create new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (error) {
    let errors2 = {};

    if (error.code === 11000) {
      errors2.email = "Email already exists";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }

    console.log(errors2);

    res.status(400).json(errors2);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "There is no such user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.redirect("/");
    } else {
      res.status(401).json({
        succeded: false,
        error: "Password are not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getAUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getDashboardPage = async (req, res) => {
  const user = await User.findById({ _id: res.locals.user._id });
  res.render("discovery", {
    link: "discovery",
    user,
  });
};

export { createUser, loginUser, getDashboardPage, getAUser };
