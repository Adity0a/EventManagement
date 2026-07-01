import jwt from 'jsonwebtoken';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const auth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        // 1. Try to verify as Custom Admin JWT
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.email === process.env.ADMIN_EMAIL) {
                return next();
            }
        } catch (err) {
            // Not a valid custom JWT, proceed to check Clerk
        }

        // 2. Try to verify as Clerk Session Token
        try {
            await clerkClient.verifyToken(token);
            return next();
        } catch (err) {
            return res.json({ success: false, message: "Invalid Token" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default auth;
