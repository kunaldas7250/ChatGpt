import { Chat } from "../models/Chat.js";
import { Conversation } from "../models/Conversation.js";

export const createChat=async(req,res)=>{
    try {
        const userId=req.user._id
        const chat=await Chat.create({
            user:userId
        })
        res.json(chat)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}
export const getallChat=async(req,res)=>{
    try {
        const chats=await Chat.find({user:req.user._id}).sort({
            createdAt:-1
        })
        res.json(chats)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          }); 
    }
}
export const addconversation=async(req,res)=>{
    try {
        const chat=await Chat.findById(req.params.id)
        if(!chat) return res.status(401).json({
            message:"Chat not found"
        })
        const Conversation2= await Conversation.create({
            chat:chat._id,
            question:req.body.question,
            answer:req.body.answer
        })
        const updatechat=await Chat.findByIdAndUpdate(req.params.id,{latestMessage:req.body.question},{new:true})
        res.json({
            Conversation2,
            updatechat
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
          }); 
    }
}
export const getConversation=async(req,res)=>{
    try {
    let  kunalconversat=await Conversation.find({chat:req.params.id})
        if(!kunalconversat) return res.status(401).json({
            message:"No Conversation with this id"
        })
        res.json(kunalconversat)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          }); 
    }
}
export const deleteChat=async(req,res)=>{
    try {
        const chat=await Chat.findById(req.params.id)
        if(!chat) return res.status(401).json({
            message:"Chat not found"
        })
        if(chat.user.toString()!==req.user._id.toString()) return res.status(403).json({
            message:"unauthorized"
        })
        await chat.deleteOne()
        res.json({
            message:"chat delete"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
          }); 
    }
}