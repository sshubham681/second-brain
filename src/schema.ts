import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: String,
});

const UserModel = model("User", UserSchema);

export { UserModel };
