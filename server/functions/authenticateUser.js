/*import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import { User } from "../models/User.js";

export const authenticateUser = (socket) => {
  const authToken = socket.handshake.auth.token;
  console.log(`this is the authToken --- ${authToken} \n`);
  jwt.verify(authToken, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(`err happened --- ${err} while authenticating user (aU) --- \n`);
      return null;
    } else if (done) {
      console.log(`done.userId --- ${done.userId}`);
      return done.userId;
    }
  });
};*/


import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import { User } from "../models/User.js";

export const authenticateUser = (socket) => {
  const authToken = socket.handshake.auth.token;
  console.log(`this is the authToken --- ${authToken} \n`);

  const done = jwt.verify(authToken , process.env.SECRET_KEY);
  return done.userId;
  /*jwt.verify(authToken, process.env.SECRET_KEY, async (err, done) => {
    if (err) {
      console.log(
        `err happened --- ${err} while authenticating user (aU) --- \n`
      );
      return null;
    } else if (done) {
      console.log(`done.userId --- ${done.userId}`);
      return done.userId;
    }
  });*/
};
