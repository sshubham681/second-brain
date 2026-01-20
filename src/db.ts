import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// DB connection
const MONGO_URI: any = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

// Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const ContentModel = model("Content", ContentSchema);
const UserModel = model("User", UserSchema);

export { UserModel, ContentModel };
