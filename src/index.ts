import express from "express";
import { version } from "./config.js";
import { connectToDB } from "./db.js";
import { UserModel } from "./schema.js";

const app = express();
app.use(express.json());

connectToDB();

// signup route
app.post(`/api/${version}/signup`, async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  // zod validation
  // hash the password using library
  // store the hashed password in db

  //   // lets test db insertions first
  //   await UserModel.create({
  //     username,
  //     password,
  //   });
  res.send({
    message: "Signup route",
  });
});

app.post(`/api/${version}/signin`, async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username, password });
  console.log(process.env.JWT_SECRET);
  res.send({
    existingUser,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Test Route",
  });
});

app.listen(8000, function () {
  console.log("Server is listening on PORT:8000");
});
