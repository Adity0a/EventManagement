import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    category: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    fullDate: { type: String },
    location: { type: String, required: true },
    fullLocation: { type: String },
    host: { type: String, required: true },
    hostRating: { type: String, default: "4.5" },
    hostReviews: { type: String, default: "0 reviews" },
    isFree: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    agenda: [
      {
        time: { type: String },
        task: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);

export default Event;
