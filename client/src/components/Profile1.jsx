import React, { useState, useEffect } from "react";
import { extractToken } from "../functions/extractToken";
import axios from "axios";
import { ImageForm } from "./ImageForm";
import { FinishProfile } from "./FinishProfile";
import { ProfilePage } from "./ProfilePage";

export const Profile1 = () => {
  
  const [profileStatus, setProfileStatus] = useState({});
  const [finishUpBtnClicked, setFinishUpBtnClicked] = useState(false);
  const [imageUploaded , setImageUploaded ] = useState(false);

  useEffect(() => {
    //find if name dateOfBirth and profilepic is empty if depending

    const userToken = extractToken("jwtToken");

    const config = {
      headers: {
        Authorization: userToken,
      },
    };

   
    axios
      .get("http://localhost:6012/profile/profileInfo", config)
      .then((response) => {
        console.log(
          `response data from the profileInfo get endpoint --- ${response.data} \n`
        );
        setProfileStatus(response.data);
        (response.data.name && response.data.dateOfBirth && !response.data.profilepic ) && setFinishUpBtnClicked(true); // userInfo was updated already but image was not uploaded
        response.data.name &&
          response.data.dateOfBirth &&
          response.data.profilepic &&
          setImageUploaded(true);
      })
      .catch((error) => {
        console.log(
          `error happened while fetching resource from the profileInfo get endpoint \n`
        );
      });
  } ,[]);

   const proceed = () => {
     setFinishUpBtnClicked(true);
   };

  return (
    <div id="Profile1-Main-Page" className="flex flex-col w-screen h-screen justify-center items-center">
      {profileStatus.name && profileStatus.dateOfBirth ? (
        profileStatus.profilepic ? (
          <ProfilePage></ProfilePage>
        ) : (!imageUploaded &&
          <ImageForm></ImageForm>
        )
      ) : (
        <FinishProfile proceed={proceed}></FinishProfile>
      )}
    </div>
  );
};
