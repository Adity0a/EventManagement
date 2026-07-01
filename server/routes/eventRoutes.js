import express from "express";
import { addEvent, listEvents, eventDetail, deleteEvent, updateEvent, registerForEvent } from "../controllers/eventController.js";
import multer from "multer";

const eventRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

eventRouter.post("/add", upload.single("image"), addEvent);
eventRouter.post("/update", upload.single("image"), updateEvent);
eventRouter.get("/list", listEvents);
eventRouter.post("/detail", eventDetail);
eventRouter.post("/delete", deleteEvent);
eventRouter.post("/register", registerForEvent);

export default eventRouter;
