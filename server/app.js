import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cors from "cors";
import methodOverride from "method-override"
import userRoute from "./routes/userRoute.js";

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


//routes
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
