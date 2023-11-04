import express from "express";
import { User } from "../models/User.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env"});

router.post("/register", async (req, res) => {

  console.log(" request recieved to register endpoint (post) \n");
  
  const { username, password } = req.body;

  try {

    //const createdUser = await User.create({ username, password });

    const user = await User.findOne({ username: username });

    if (user) {
      console.log(" if user exists in database -- ", user, "\n");
    } else {
        bcrypt.genSalt(10 , (err , salt) => {
            bcrypt.hash( password , salt , async ( err , hash)=> {
                if (err) {
                    console.log(`error happened while hashing the password \n`);
                    return ;
                } 

                try {
                     const newUser = await User.create({
                       username: username.trim(),
                       password: hash,
                     }).then((result) => {
                        console.log(result);
                     })

                     res.json({ message: "User created successfully!" , newUser});

                     console.log("password hashed and stored successfully!");
                    
                } catch (error) {

                    console.log(`error happened while hashing password \n`);
                   
                    
                }

            })
        })
      
      
    }
  } catch (error) {
    console.log(
      `error encountered while attempting to register --- ${error} \n`
    );
  }
});

router.post("/login",async (req, res) => {

  console.log(`POST Req receieved to the Login Endpoint --- \n`);
  

  const { username , password } = req.body;

  console.log(`the password of this user --- ${password} \n`);

  const userExists = await User.findOne({ username });

  const secretKey = process.env.SECRET_KEY || null;
  console.log(`secretKey --- ${secretKey} \n`);

  if ( userExists ) {
    console.log(`user Exists !`)

    console.log( password , ` --- entered password while trying to login --- \n`);

    console.log( userExists.password , `this is the hashed Password --- \n`);

    const isPasswordValid = await bcrypt.compare( password , userExists.password , (err , result) => {
        if (err) {
            console.log( err , ` some error \n`)
        } else {
            if (result) {
                console.log(`yeah passwords match --- \n`);
                jwt.sign(
                  { userId: userExists._id },
                  secretKey,
                  { expiresIn: 60 * 60 },
                  function (err, token) {
                    if (err) {
                      console.log(
                        `${err} --- happened while trying to generate to token --- \n`
                      );
                    }
                    console.log(
                      token,
                      ` -- the generated token for ${userExists.username} `
                    );
                    res.json({ token });
                  }
                );
            } else {
                console.log(`passwords do not match --- \n`)
            }
        }
    } );


  } else {
    console.log(`User doesnt exist :( !!! \n`);
    res.json({ message: "user does not exist!!"});
  }

});


export { router as authRouter }