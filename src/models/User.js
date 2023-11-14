import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is NOT valid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    fullname: {
      type: String,
      trim: true,
      required: [true, "Fullname is required"],
      minLength: [3, "Fullname must be at least 3 characters"],
      maxLength: [30, "Fullname must be at most 50 characters"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default models.User || model("User", userSchema);
