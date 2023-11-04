import express from "express";
import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";


const MessageSchema = Schema({
    
    sender: { type: mongoose.Schema.Types.ObjectId , ref: "User" , required: true },
    chat: { type: mongoose.Schema.Types.ObjectId , ref: "Chat" , required: true },
    content: { type: String , trim: true},

} , { timestamps: true})

export const Message = mongoose.model("Message" , MessageSchema);