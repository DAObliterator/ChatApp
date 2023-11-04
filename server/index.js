import express from "express";
import dotenv from "dotenv";
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


const jwtSecret = process.env.SECRET_KEY;

const app = express();
app.use(express.static("public")); 

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser())
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

//ROUTES
app.use("/auth" , authRouter);
app.use("/profile" , profileRouter);
app.use("/media", mediaRouter);
app.use("/users" , userRouter);
app.use("/chats" , chatRouter);

app.get("/test", (req, res) => {
  res.send("<h2> test ok </h2>");
});

app.get("/profile" , ( req ,res )=> {

    console.log(`get req recieved to the profile endpoint \n`)
    const {token} = req.body;
    jwt.verify( token , jwtSecret , {} ,  (err, userData) => {
        if (err) throw err;
        res.json(userData)

    } )
})



const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port - ${port} \n`);
});
