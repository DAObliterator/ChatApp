import express from "express";
import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";


const ChatSchema = Schema({

    chatName: { type: String , trim: true}, 
    participants: [{ type: mongoose.Schema.Types.ObjectId , ref: "User" }],

} ,{timestamps: true})

export const Chat = mongoose.model("Chat" , ChatSchema)