import express from "express";
import { loginUser, myProfile, verifyUser } from "../controllers/UserControllers.js";
import { isAuth } from "../middlewar/isAuth.js";
const router=express.Router()
router.post("/login",loginUser)
router.post("/verify",verifyUser)
router.get("/me",isAuth,myProfile)
export default router