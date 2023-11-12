import http from "http";
import express from "express";
import dotenv from "dotenv";
import { Server as SocketServer } from "socket.io";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({ path: "./config.env" });
import { User } from "./models/User.js";
import bcrypt from "bcryptjs";
import { authRouter } from "./routes/authRoute.js";
import { profileRouter } from "./routes/profileRouter.js";
import { mediaRouter } from "./routes/mediaRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { chatRouter } from "./routes/chatRouter.js";
import { authenticateUser } from "./functions/authenticateUser.js";
import { generateChatName } from "./functions/generateChatName.js";
import { Chat } from "./models/Chat.js";
import { Message } from "./models/Message.js";

const jwtSecret = process.env.SECRET_KEY;

const app = express();
const server = http.createServer(app);
app.use(express.static("public"));

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//DATABASE CONNECTION
const DB = process.env.DATABASE_STRING.replace(
  "<password>",
  process.env.PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log(`DATABASE CONNECTION WAS SUCCESSFULL !`);
  })
  .catch((error) => {
    console.log(error, ` --- this error happened \n`);
  });

///WEB SOCKET IMPLEMENTATION
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A new user connected ", socket.id, " --socket.id-- \n");

  const userId = authenticateUser(socket);

  console.log(`userId(inside io.on) --- ${userId} \n`);

  userSocketMap[userId] = socket; //new user connects socket is mapped to userId

  socket.on("chatMessage", async (data) => {
    const { message, recipientId, time } = data; // the emitted data object contains these three properties

    /*see if a chat doc already exists with the recipientId and the 
    userId as the participants if it doesnt , create one */

   const existingChat = await Chat.findOne({
     $and: [
       { participants: { $elemMatch: { $eq: userId } } },
       { participants: { $elemMatch: { $eq: recipientId } } },
     ],
   });


    if (existingChat) {
      console.log(`chat already exists \n`);
      //here you find the chat that these two as participants and then find the messages 
      try {
        const newMessage = new Message({
          sender: userId,
          chat: existingChat._id,
          content: message,
        });
        newMessage.save();
      } catch (error) {
        console.log(
          `err happened while adding creating a new message doc with ref to existing chat - ${error}`
        );
      }
      try {
        Message.findOne({
          sender: userId,
        })
          .populate("chat")
          .exec();
      } catch (error) {
        console.log(
          `error happened while trying to populate the chat field in newly created message doc -- ${error}`
        );
      }
    } else {
      const chatName = await generateChatName(userId, recipientId);

      try {
        const newChat = new Chat({
          participants: [userId, recipientId],
          chatName: chatName,
        });
        newChat.save();
      } catch (error) {
        console.log(
          `error happened while trying to create a newChat doc -- ${error}`
        );
      }

      try {
        Chat.findOne({ chatName: chatName })
          .populate("participants", "-name -dateOfBirth -profilepic")
          .exec();
      } catch (error) {
        console.log(
          `error happened while trying to populate the participants field -- ${error}`
        );
      }

      const chat = await Chat.findOne({
        chatName: chatName,
      });

      if (chat) {
        // Create and save the new message
        try {
          const newMessage = new Message({
            sender: userId,
            chat: chat._id,
            content: message,
          });

          newMessage.save();
        } catch (error) {
          console.log(
            `error happened while attempting to create a new message doc `
          );
        }

        try {
          Message.findOne({
            sender: userId,
          })
            .populate("chat")
            .exec();
        } catch (error) {
          console.log(
            `error happened while trying to populate the chat field in newly created message doc -- ${error}`
          );
        }
      }
    }

    console.log(`this is the data -- ${JSON.stringify(data)} \n`);

    const recipientSocket = userSocketMap[recipientId];

    console.log(`userSocketMap --- ${userSocketMap} \n`);

    if (recipientSocket) {
      console.log(`recipientSocket exists \n`);
      recipientSocket.emit("message", {
        message: message,
        recipientId: userId,
        time: new Date(),
      });
    } else {
      console.log(`recipientSocket dne \n`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnected \n`);
    // Remove the socket from userSocketMap on disconnection
    delete userSocketMap[userId];
  });
});

//ROUTES
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/media", mediaRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);

app.get("/test", (req, res) => {
  res.send("<h2> test ok </h2>");
});

app.get("/profile", (req, res) => {
  console.log(`get req recieved to the profile endpoint \n`);
  const { token } = req.body;
  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) throw err;
    res.json(userData);
  });
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`app listening on port - ${port} \n`);
});
