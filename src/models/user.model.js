import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const User = new model("User", userSchema);

export default User;
