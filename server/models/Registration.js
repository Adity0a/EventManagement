import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "event", required: true },
    clerkId: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    occupation: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

const Registration = mongoose.models.registration || mongoose.model("registration", registrationSchema);

export default Registration;
