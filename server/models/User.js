import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    profilepic:{
      type: String
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
