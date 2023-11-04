import express from "express";
import { User } from "../models/User.js";
import mongoose from "mongoose";
import { diskStorage } from "multer";
import fs from "fs";
import multer from "multer";
import { pathToUrlConverter } from "../functions/pathToUrl.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env"});

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     if (!fs.existsSync("public")) {
       fs.mkdirSync("public");
     }

     if (!fs.existsSync("public/profilepics")) {
       fs.mkdirSync("public/profilepics");
     }

     cb(null, "public/profilepics");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // ull forget
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


router.post(
  "/profilePicUpload", upload.single("profilePic")/* this tries to access the key called profilePic in the formdata */,
  async (req, res) => {
    console.log(`post request recieved to profilePicUpload endpoint \n`);

    console.log(` userToken ${req.headers.authorization ? req.headers.authorization : "no user token"} \n`)
    
    if (!req.file) {
        console.log("no file uploaded \n");

        return res.status(400).json({ message: "No file uploaded." });
    }

    const { originalname, filename, path, size } = req.file;

    console.log(`req.file.path --- ${JSON.stringify(req.file.path)} ---`);

    const newStr =  req.file.path.slice(7)
    
    const fileUrl = pathToUrlConverter(newStr);

    try {
      const loggedInUser = await User.findById({
        _id: jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
          .userId,
      });

      if (loggedInUser && !loggedInUser.profilepic) {
        await User.findByIdAndUpdate(
          {
            _id: jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
              .userId,
          },
          { profilepic: fileUrl },
          { new: true }
        );

        return res
          .status(200)
          .json({ message: "the image has been uploaded successfully" });
      } else {
        console.log(`profilepic field is not empty \n`);
        return res
          .status(400)
          .json({
            message: "the profilepic was already uploaded ",
          });
      }
      
    } catch (error) {
      console.error("Error while updating user profile pictures:" , error );
      return res.json(500).json({ message: "Internal server error"})
    }

    

  }
);

export { router as mediaRouter };
