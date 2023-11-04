import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

export const verifyToken = jwt.verify( userToken , process.env.SECRET_KEY , async(err , done) => {
    if (err) throw err;
    else return done;
})