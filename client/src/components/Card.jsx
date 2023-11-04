import React, { useState, useEffect } from "react";
import { ImageForm } from "./ImageForm";
import axios from "axios";
import { extractToken } from "../functions/extractToken";
import { useUser } from "../apis/ContextApi";

export const Card = () => {
  const [Name, setName] = useState("");
  const [DoB, setDoB] = useState("");
  const { user } = useUser();

  useEffect(() => {
    //const userToken = extractToken("jwtToken");

    console.log(
      ` user Context inside of UseEffect in Card.jsx ${user} and user.token --- ${
        user && user.token
      } \n`
    );

    const userToken = user && user.token;

    const config = {
      headers: {
        Authorization: `${user && user.token}`,
      },
    };

    async function fetchUserInfo() {
      await axios
        .post("http://localhost:6012/profile/userInfo", {userToken})
        .then((response) => {
          console.log(
            ` response.data inside of Card.jsx --- ${JSON.stringify(response.data)} \n `
          );
          setName(response.data.name);
          setDoB(response.data.dateOfBirth);
        })
        .catch((error) => {
          console.log(
            `error happened while trying to make call to /userInfo endpoint --- \n`
          );
        });
    }

    fetchUserInfo();
  }, []);

  return (
    <div
      id="Card-main"
      className="flex flex-col bg-slate-400 shadow-md rounded-xl w-48 h-64 sm:h-80 sm:w-64 pb-4 sm:p-4 "
    >
      <div
        id="image-div"
        className="flex flex-col items-center justify-center w-full "
      >
        <ImageForm></ImageForm>
      </div>
      <div
        id="profile-nam"
        className="w-full h-1/4 text-center text-slate-950 "
      >
        {Name}
      </div>
      <div
        id="profile-dob"
        className="w-full h-1/4 text-center text-slate-950 "
      >
        {DoB}
      </div>
    </div>
  );
};
