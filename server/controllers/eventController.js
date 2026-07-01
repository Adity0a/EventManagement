import fs from "fs";
import imagekit from "../config/imagekit.js";
import eventModel from "../models/Event.js";
import registrationModel from "../models/Registration.js";

// API for adding a new event
const addEvent = async (req, res) => {
  try {
    const { event: eventData } = req.body;
    const parsedEvent = JSON.parse(eventData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Image not found" });
    }

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/events",
    });

    // optimized through imagekit URL transformation
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto Compression
        { format: "webp" }, // Convert to modern format
        { width: "1280" }, // Width resizing
      ],
    });

    const newEvent = new eventModel({
      ...parsedEvent,
      image: optimizedImageURL,
    });

    await newEvent.save();

    res.json({ success: true, message: "Event Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for listing all events
const listEvents = async (req, res) => {
  try {
    const events = await eventModel.find({});
    res.json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for getting event detail
const eventDetail = async (req, res) => {
  try {
    const { id } = req.body;
    const event = await eventModel.findById(id);
    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, event });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for deleting an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.body;
    await eventModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Event Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for updating an event
const updateEvent = async (req, res) => {
  try {
    const { event: eventData } = req.body;
    const parsedEvent = JSON.parse(eventData);
    const { id, ...updateData } = parsedEvent;
    const imageFile = req.file;

    let optimizedImageURL = updateData.image;

    if (imageFile) {
      // Upload new image to ImageKit
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/events",
      });

      // optimized through imagekit URL transformation
      optimizedImageURL = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" }, // Auto Compression
          { format: "webp" }, // Convert to modern format
          { width: "1280" }, // Width resizing
        ],
      });
    }

    const updatedEvent = await eventModel.findByIdAndUpdate(
      id,
      {
        ...updateData,
        image: optimizedImageURL,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: "Event Updated Successfully", event: updatedEvent });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const { eventId, clerkId, fullName, email, phone, occupation, notes } = req.body;

    if (!eventId || !clerkId || !fullName || !email || !phone) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Check if already registered
    const existingRegistration = await registrationModel.findOne({ eventId, clerkId });
    if (existingRegistration) {
      return res.json({ success: false, message: "You are already registered for this event" });
    }

    const newRegistration = new registrationModel({
      eventId,
      clerkId,
      fullName,
      email,
      phone,
      occupation,
      notes,
    });

    await newRegistration.save();

    res.json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addEvent, listEvents, eventDetail, deleteEvent, updateEvent, registerForEvent };
