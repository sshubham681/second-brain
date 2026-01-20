import express from "express";
import { version } from "./config.js";
import { connectToDB } from "./db.js";
import { UserModel } from "./schema.js";
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

  // hash the password using library
  const hashedPassword = await bcrypt.hash(password, 10);

  // store the hashed password in db
  await UserModel.create({
    username,
    password: hashedPassword,
  });
  res.send({
    message: "User created successfully!",
  });
});

app.post(`/api/${version}/signin`, async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }
  const { username, password } = parsed.data;
  // find user by user name
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  // compare password with hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  // success case
  res.status(200).json({
    message: "Sign in successful",
    user: {
      id: user._id,
      username: user.username,
    },
  });
});

app.listen(8000, function () {
  console.log("Server is listening on PORT:8000");
});
