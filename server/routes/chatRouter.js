import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";

router.get(`/findAllTheExistingChats`, async (req, res) => {
  const recipientId = req.query.recipientId;
  const userId = req.headers.authorization;

  console.log(
    `get req recieved to the chat endpoint and recipientId -- ${
      recipientId && recipientId
    }  , userid -- ${userId && userId} \n  `
  );

  const existingChat = await Chat.findOne({
    $and: [
      { participants: { $elemMatch: { _id: userId } } },
      { participants: { $elemMatch: { _id: recipientId } } },
    ],
  });

  if (existingChat) {
    console.log(`chat already exists \n`);
    const messages = await Message.find({
      chat: existingChat._id
    }).lean();

    console.log(`the existing messages array --- ${messages}`)
    /*here you find the chat that these two as participants and then find the messages */
    return res.json(messages);
  } else {
    console.log(`chat with these participants doesnt exist \n`);
    return res.status(404).json({ message: "error resource not found" })
  }
});

export { router as chatRouter };
