import express from "express";
import { version } from "./config.js";
import { connectToDB } from "./db.js";
import { UserModel } from "./schema.js";
import z from "zod";
import bcrypt from "bcrypt";
import { signUpSchema } from "./zod/zodSchema.js";

const app = express();
app.use(express.json());

connectToDB();

// signup route
app.post(`/api/${version}/signup`, async (req, res) => {
  // zod validation
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      error: result.error.flatten().fieldErrors,
    });
  }
  const { username, password } = result.data;
  console.log(username, password);
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

app.listen(8000, function () {
  console.log("Server is listening on PORT:8000");
});
