import React, { useState, useEffect } from "react";
import { SetProfile } from "./SetProfile";
import { useUser } from "../apis/ContextApi";
import { ImageForm } from "./ImageForm";
import axios from "axios";
import { extractToken } from "../functions/extractToken";
import { Card } from "./Card";


export const Profile = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [proceedBtnClicked, setProceedBtnClicked] = useState(false);
  const [finishUpBtnClicked, setFinishUpBtnClicked] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { user } = useUser();
  const { userInfo } = useUser();
  const { setUserInfo } = useUser();
  const [showSetProfile, setShowSetProfile] = useState(true);
  const [showImageForm, setShowImageForm] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log(`user.token --- ${user && user.token}\n`);

    //const userToken = extractToken("jwtToken");

    const userToken = user && user.token;

    const config = {
      headers: {
        Authorization: `${user && user.token}`
      }
    }

    console.log(`userToken == ${userToken}  ${Date.now()} \n`);

    async function fetchUserInfo() {
      await axios
        .post("http://localhost:6012/profile/userInfo",  { userToken }  )
        .then((response) => {
          console.log(
            `This is the response data from the userInfo endpoint --- ${JSON.stringify(
              response.data
            )} \n`
          );
          setUserName(response.data.username);
          setImageURL(response.data.profilepic);
          setName(response.data.name);
          setDob(response.data.dateOfBirth);
        });
    }

    fetchUserInfo();
  }, []);

  const proceedClick = () => {
    setProceedBtnClicked(true);
    setShowSetProfile(false);
  };

  const handleInfoSubmit = async (ev) => {
    /* send the submitted info to api and update the userInfo , and the userInfo obj inside of the context api also needs to be changed else
     */

    ev.preventDefault();

    const response = await axios
      .post("http://localhost:6012/profile/editProfile", {
        name,
        dob,
        token: user.token,
      })
      .then((response) => {
        console.log(` response data --- ${response}`);
        setUserInfo(response.data);
      });

    setFinishUpBtnClicked(true);
  };
  return (
    <div
      id="profile-main"
      className="flex flex-col w-screen h-screen justify-evenly items-center font-bold bg-slate-200 "
    >
      {console.log(userInfo, " -- userInfo \n")}
      <div
        id="welcome-message"
        className="flex flex-col justify-center items-center text-center "
      >
        <h1 className=" m-12 text-xl sm:text-2xl  items-center ">
          {userInfo.status === "incomplete" &&
          userInfo.image_status === "incomplete" ? (
            "Finish Setting Up Your Profile"
          ) : userInfo.status === "complete" &&
            userInfo.image_status === "incomplete" ? (
            "Upload Your Profile Picture"
          ) : (
            <ProfilePage imageURL={imageURL} dob = {dob} name={name} userName={userName} ></ProfilePage>
          )}{" "}
        </h1>
      </div>

      {userInfo.status === "incomplete" && proceedBtnClicked && (
        <div>
          <form
            action=""
            id="profile-form"
            className="flex flex-col w-1/2 m-12 p-4 justify-between bg-white border-solid rounded-lg shadow-md"
          >
            <h2 className="text-4xl text-center text-slate-900 m-6">
              Enter Your Details
            </h2>
            <div
              id="profile-form-name"
              className="flex flex-row m-6 text-slate-900"
            >
              <label
                htmlFor="name"
                id="profile-name"
                className="w-1/2 text-lg sm:text-xl"
              >
                Enter your Nickname
              </label>
              <input
                type="text"
                id="name"
                className="w-1/2 text-2xl border-2 rounded-md border-slate-300"
                placeholder="Name..."
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div
              id="profile-form-name"
              className="flex flex-row m-6 text-slate-900"
            >
              <label
                htmlFor="name"
                id="profile-name"
                className="w-1/2 text-2xl"
              >
                Enter your DOB...
              </label>
              <input
                type="date"
                id="name"
                className="w-1/2 text-1xl border-2 rounded-md border-slate-300"
                onChange={(ev) => setDob(ev.target.value)}
              />
            </div>
            <button
              id="profile-set-btn"
              type="submit"
              className="text-white text-xl bg-blue-500 rounded-md"
              onClick={handleInfoSubmit}
            >
              Finish Up
            </button>
          </form>
        </div>
      )}
      {showSetProfile && userInfo.status === "incomplete" && (
        <SetProfile proceed={proceedClick}></SetProfile>
      )}
      {userInfo.image_status === "incomplete" &&
        userInfo.status === "complete" && <Card></Card>}
    </div>
  );
};
