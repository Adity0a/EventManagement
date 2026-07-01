import express from 'express';
import { adminLogin, getDashboard, generateEventContent } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.post("/generate-description", generateEventContent);

export default adminRouter;
