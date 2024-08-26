import sendMail from "../middlewar/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email: email,
      });
    }
    const otp = Math.floor(Math.random() * 1000000);
    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      expiresIn: "1h",
    });
    await sendMail(email, "Chat-Bot", otp);
    res.json({
      message: "OTP sent to your email",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    const verify = await jwt.verify(verifyToken, process.env.Activation_sec);
    if (!verify) {
      return res.status(401).json({ message: "otp Expired" });
    }
    if (verify.otp !== otp)
      return res.status(400).json({ message: "wrong otp" });
    const token=jwt.sign({_id:verify.user._id},process.env.jwt_sec,{
        expiresIn:"5d"
    })
    res.json({
        message:"Logged in successfully",
        user:verify.user,
        token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const myProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id)
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}