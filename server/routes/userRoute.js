import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env"});


router.get(`/`, async (req, res) => {
  console.log(`get req recieved to the "userId=:id" endpoint \n  `);

  const id = req.query.userId;
 

  console.log(
    ` the userId of the user whose profile is being displayed in the userPage  --- ${id} \n`
  );

  const otherUser = await User.findOne({ _id: id}).select("-password");

  res.json(otherUser);
});


router.get('/allOtherUsers' , async (req,res) => {

  console.log(`get request recieved to users/allOtherUsers endpoint \n`);

  const currentUser = req.headers.authorization;

  jwt.verify( currentUser , process.env.SECRET_KEY , async (err , done) => {
    if (err) {
        console.log(
          `err happened while decrypting token @ allOtherUsers endpoint -- ${err} \n`
        );

    } else if (done) {

      const otherUsers = await User.find({ _id: { $ne: done.userId } }).select(
        "-password -dateOfBirth "
      ).lean();

      return res.status(200).json(otherUsers);
    }
  })

  
})


router.get('/otherUser' , (req,res) => {

  console.log(`req get recieved from the otherUser \n`);

  const otherUserId = req.query.userId;

  const currentUser = req.headers.authorization;

  jwt.verify(currentUser, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(
        `err happened while decrypting token @ allOtherUsers endpoint -- ${err} \n`
      );
    } else if (done) {

      try {

        const otherUser = await User.findById(otherUserId).select(
          "-password -dateOfBirth "
        );

        return res.status(200).json(otherUser);
        
      } catch (error) {

        return res.status(404).json(({ message: "couldnt find the otherUser " , status:"fail"}))
        
      }
      
    }
  });






})

export { router as userRouter };
