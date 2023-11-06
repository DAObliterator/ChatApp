
import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";


router.get(`/`, async (req, res) => {
  
  console.log(`get req recieved to the chat endpoint \n  `);

  const id = req.query.userId;
  const currentUser = req.headers.authorization;

  console.log(
    ` currently viewing chat , participants - ${id} and ${currentUser &&  currentUser}(loggedIn/sender) ---\n`
  );

  /* find the chatDoc with currentUser and otherUser as participants and 
    find the id of the chat with them both as participants and find all messages with that chat id
  */

});

export { router as chatRouter };
