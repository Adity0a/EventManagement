import jwt from 'jsonwebtoken'
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import generateAIContent from '../config/groq.js';

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid Credential" })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getDashboard = async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        const totalRegistrations = await Registration.countDocuments();
        const recentRegistrations = await Registration.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        const popularEvents = await Event.find({})
            .sort({ createdAt: -1 })
            .limit(3);

        const dashboardData = {
            totalEvents,
            totalRegistrations,
            recentRegistrations,
            popularEvents
        }
        res.json({ success: true, dashboardData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const generateEventContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.json({ success: false, message: "Prompt is required" });
        }
        const content = await generateAIContent(prompt);
        res.json({ success: true, content });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
