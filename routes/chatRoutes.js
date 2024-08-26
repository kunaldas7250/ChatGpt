import express from "express"
import { isAuth } from "../middlewar/isAuth.js"
import {addconversation, createChat, deleteChat, getallChat, getConversation} from "../controllers/chatcontrollers.js"
const router=express.Router()
router.post("/new",isAuth,createChat)
router.get("/all",isAuth,getallChat)
router.post("/:id",isAuth,addconversation)
router.get("/:id",isAuth,getConversation)
router.delete("/:id",isAuth,deleteChat)
export default router