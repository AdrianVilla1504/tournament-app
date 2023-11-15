import { Schema, model, models } from "mongoose";

const inscriptionSchema = new Schema(
  {
    tournament_id: {
      type: String,
      required: [true, "A tournament id is required"],
      trim: true,
    },
    user_id: {
      type: String,
      trim: true,
      required: [true, "An user id is required"],
    },
    signup_cost: {
      type: String,
      trim: true,
      required: [true, "A tennis court for the tournament is required"],
    },
    status_payment: {
      type: String,
      enum: ["PENDING", "PAID", "CADUCATED"],
      default: "PENDING",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default models.Inscription || model("Inscription", inscriptionSchema);
