import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    negotiable: {
      type: String,       // "yes" / "no"
      enum: ["yes", "no"],
      default: "no",
    },

    term: {
      type: String,       // frontend sends "short" or "long"
      enum: ["short", "long"],
      required: true,
    },

    startDate: {
      type: Date,
      required: function () {
        return this.term === "long";
      },
    },

    endDate: {
      type: Date,
      required: function () {
        return this.term === "long";
      },
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
      trim: true,
    },

    requestingFor: {
      type: String,   // "yourself" or "someone"
      enum: ["yourself", "someone"],
      required: true,
    },

    name: {
      type: String,
      required: function () {
        return this.requestingFor === "someone";
      },
      trim: true,
    },

    phone: {
      type: String,                  // NOT required because UI does not require it
      match: [/^\d{10}$/, "Enter valid 10-digit phone"],
    },

    address: {
      type: String,
      required: function () {
        return this.requestingFor === "someone";
      },
      trim: true,
    },

    additionalInstructions: {
      type: String,
      trim: true,
      default: "",
    },

    urgency: {
      type: String,
      enum: ["urgent", "non-urgent"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
