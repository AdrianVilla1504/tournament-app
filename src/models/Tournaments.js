import { Schema, model, models } from "mongoose";

const tournamentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tournament name is required"],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "A tournament city is required"],
    },
    tennis_court: {
      type: String,
      required: [true, "A tennis court for the tournament is required"],
    },
    max_contestants: {
      type: Number,
      required: [true, "A maximum number of contestants is required"],
    },
    registered_contestants: {
      type: Number,
      default: 0,
    },
    incription_price: {
      type: Number,
      required: [true, "An inscription price is required"],
    },
    beggining_date: {
      type: Date,
      required: [true, "A beginning date is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Tournament || model("Tournament", tournamentSchema);
