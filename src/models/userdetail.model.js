import { Schema, model } from "mongoose";

const userdetailSchema = new Schema(
  {
    userid: { type: String },
    name: { type: String },
    phone: { type: Number },
    country: { type: String },
    additionalinfo: { type: String },
    filepath: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const UserDetail = new model("UserDetail", userdetailSchema);

export default UserDetail;
