import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: "Please Login" });
    const decoded = await jwt.verify(token, process.env.jwt_sec);
    req.user=await User.findById(decoded._id)
    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed Login First",
    });
  }
};
