import React, { useState, useEffect } from "react";
import { extractToken } from "../functions/extractToken";
import axios from "axios";

export const ProfilePage = () => {
  const userToken = extractToken("jwtToken");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {

    const config = {
      headers: {
        Authorization: userToken,
      },
    };

    console.log(userToken , "userToken inside of ProfilePage \n");

    axios
      .get("http://localhost:6012/profile/currentUserInfo",  config )
      .then((response) => {
        console.log(`response data --- ${JSON.stringify(response.data)} \n`);
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log(
          `error happened while fetching info about logged in user\n`
        );
      });

  }, []);

  return (
    <div
      id="ProfilePage-Main"
      className="flex flex-col h-screen w-screen bg-neutral-400 justify-evenly text-center"
    >
      <div
        id="ProfilePage-Heading-Div"
        className="w-full h-1/6 bg-slate-300 flex justify-center items-center text-center text-2xl sm:text-3xl text-slate-800"
      >
        Profile
      </div>
      <div
        id="ProfilePage-Info"
        className="w-screen h-5/6 bg-slate-500 flex flex-row justify-center items-center"
      >
        <div
          id="ProfilePage-ImageContainer-Div"
          className="flex justify-center items-center w-1/2 h-full"
        >
          <div
            id="ProfilePage-Image-Div"
            className="flex justify-center items-center h-64 w-64 rounded-full border-2 border-black"
          >
            <img src={userDetails.profilepic} alt="profileimage" id="ProfilePage-UserProfilePic" className="h-full w-full rounded-full" />
          </div>
        </div>
        <div
          id="ProfilePage-ImageContainer-Div"
          className="flex justify-center items-center w-1/2 h-full border-2 border-blue-800"
        >
          <ul id="UserDetails-Wrapper">
            <li>{userDetails.name}</li>
            <li>{userDetails.dateOfBirth}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
