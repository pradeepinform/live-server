// middleware/authMiddleware.js
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Middleware Token = ", token)
  if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    req.user = {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
    };

    next();
  } catch (error) {
    console.error("Google token verify error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;