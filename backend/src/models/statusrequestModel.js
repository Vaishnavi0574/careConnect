import mongoose from 'mongoose'
const statusrequestSchema = new mongoose.Schema(
  { requestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        required: true,
  },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    currentStatus: {
      type: String,
      enum: ["created", "pending", "accepted", "completed", "cancelled","inprogress"],
      default: "created",
    },
  },
  { timestamps: true }
);
const statusRequest = mongoose.model("statusRequest", statusrequestSchema);

export default statusRequest;