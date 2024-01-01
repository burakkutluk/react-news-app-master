import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cors from "cors";
import User from "./models/userModel.js";
import methodOverride from "method-override"

dotenv.config();

conn();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/register", (req, res) => {
  res.send("Hello register!");
});

app.post("/register", (req, res) => {
  User.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
