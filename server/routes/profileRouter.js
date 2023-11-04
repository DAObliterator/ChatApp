import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

const router = express.Router();

router.post("/userInfo", async (req, res) => {
  console.log(
    `post request recieved to userInfo endpoint and user.token --- ${req.body.userToken} \n`
  );

  jwt.verify(req.body.userToken, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(
        `err happened while decrypting token @ userInfo endpoint -- ${err} \n`
      );
    } else if (done) {
      console.log(`userId of the logged in user -- ${done.userId}`);

      const loggedInUserDoc = await User.findOne({ _id: done.userId }).select(
        "-password"
      );

      res.json(loggedInUserDoc);
    }
  });
});


router.get("/currentUserInfo", async (req, res) => {

  const userToken = req.headers.authorization;

  console.log(
    `get request recieved to currentUserInfo endpoint and user.token --- ${userToken} \n`
  );

  jwt.verify(userToken, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(
        `err happened while decrypting token @ userInfo endpoint -- ${err} \n`
      );
    } else if (done) {
      console.log(`userId of the logged in user -- ${done.userId}`);

      const loggedInUserDoc = await User.findOne({ _id: done.userId }).select(
        "-password"
      );

      res.json(loggedInUserDoc);
    }
  });
});

router.post("/findUser", async (req, res) => {
  /*console.log(
    `post request recieved to findUser endpoint and user.token --- ${req.body.userToken} 
    and text entered in input search field --- ${req.body.username} \n`
  );*/

  jwt.verify(req.body.userToken, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(
        `err happened while decrypting token @ userInfo endpoint -- ${err} \n`
      );
    } else if (done) {
      //console.log(`userId of the logged in user -- ${done.userId}`);
      const matchedUserDocsArr = await User.find({ _id : { $ne: done.userId}})
        .select("-password -name -dateOfBirth")
        .lean();

      const newMatchedUserDocsArr = req.body.username
        ? matchedUserDocsArr.filter((element) => {
            return element.username.includes(req.body.username);
            // Or use isSubString2 here if needed
          })
        : [];

      /*console.log(
        ` the userDocs with usernames --- ${
          newMatchedUserDocsArr && JSON.stringify(newMatchedUserDocsArr)
        } that contains the entered text ie --- ${
          req.body.username
        } in the user text fields \n`
      );*/

      res.json(newMatchedUserDocsArr);
    }
  });
});

router.get("/setProfile", async (req, res) => {
  console.log(`get request recieved to the setProfile endPoint \n`);

  /* logic to determine out whether the profile of the user is complete or incomplete  */

  const currentUserId = req.headers.authorization; //HTTP field names are case insensitive
  console.log(` user -- ${currentUserId} \n `);

  const isLoggedIn = jwt.verify(
    currentUserId,
    process.env.SECRET_KEY,
    async (err, done) => {
      if (err) {
        console.log(`${err} happened while verifying \n`);
      } else {
        // so done returns an object with the payload and created at and expireredAt Parameter
        /*console.log(
          `${JSON.stringify(
            done.userId
          )} -- currentUserId in decrypted format \n`
        );*/

        //const currentUser = await User.findOne({ _id : done});

        //console.log(` this is the current user - ${currentUser} \n`)

        const loggedInUser = await User.findOne({ _id: done.userId });

        console.log(loggedInUser, `loggedInUser \n`);

        let profileStatus = {};

        /*if (!loggedInUser.name) {
          profileStatus.name = "name";
          profileStatus.status = "incomplete";
        }
        if (!loggedInUser.dateOfBirth) {
          profileStatus.dateOfBirth = "dateOfBirth";
        } else {
          profileStatus.status = "complete";
          profileStatus.image_status = "incomplete";
        }*/

        console.log(`profile pic --- ${loggedInUser.profilepic}`);

        if (
          !loggedInUser.name &&
          !loggedInUser.dateOfBirth &&
          !loggedInUser.profilepic
        ) {
          profileStatus.name = "name";
          profileStatus.dateOfBirth = "dateOfBirth";
          profileStatus.status = "incomplete";
          profileStatus.image_status = "incomplete";
        }

        if (
          loggedInUser.name &&
          loggedInUser.dateOfBirth &&
          !loggedInUser.profilepic
        ) {
          profileStatus.name = "name";
          profileStatus.dateOfBirth = "dateOfBirth";
          profileStatus.status = "complete";
          profileStatus.image_status = "incomplete";
        }

        if (
          loggedInUser.name &&
          loggedInUser.dateOfBirth &&
          loggedInUser.profilepic
        ) {
          profileStatus.status = "complete";
          profileStatus.image_status = "complete";
        }

        res.json(profileStatus);
      }
    }
  );
});

/*router.post('/setProfile' , (req,res) => {

    const { name , dateOfBirth } = req.body;

})*/

router.post("/editProfile", async (req, res) => {

  const { nickname, dateOfBirth } = req.body;
  const token = req.headers.authorization;

  console.log(
    `Post request recieved to editProfile endpoint ,
     info recieved from frontend - name - ${nickname} and 
     dob - ${dateOfBirth} and token - ${token}\n `
  );
  const userId = jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, done) => {
      if (err) {
        console.log(`error happened while verifying token \n`);
        res.status(500).json({ message: "internal server error", err });
      } else if (done) {
        /*console.log(
          `${JSON.stringify(
            done.userId
          )} -- currentUserId in decrypted format \n`
        );*/

        const userId = done.userId;

        try {
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: nickname, dateOfBirth: dateOfBirth },
            { new: true }
          );

          if (!updatedUser) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
          }

          const profileStatus = {
            status: "completed",
            image_status: "incomplete",
          };

          res.json(profileStatus);
        } catch (error) {
          console.log(
            `Error happened while attempting to finish setting up the profile: ${error}\n`
          );
          res.status(500).json({ message: "Internal server error" });
        }
      }
    }
  );
});

router.get("/profileInfo", async (req, res) => {

  console.log(` get request receieved to profileInfo endpoint --`)
  const currentUser = req.headers.authorization;

  jwt.verify(currentUser, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(
        `error happened while verifying token at profileInfo get endpoint \n`
      );
    } else if (done) {
      /*console.log(
        `${JSON.stringify(done.userId)} -- currentUserId in decrypted format \n`
      );*/

      const userId = done.userId;

      const loggedInUserDoc = await User.findOne({ _id: userId }).select(
        "-password"
      );

      res.json(loggedInUserDoc);
    }
  });
});

export { router as profileRouter };
