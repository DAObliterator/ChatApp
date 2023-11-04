import React, { useState, useEffect } from "react";
import { extractToken } from "../functions/extractToken";
import IosShareIcon from "@mui/icons-material/IosShare";
import axios from "axios";
import { useUser } from "../apis/ContextApi";


/* if the name and the DOB was submitted then display this component, if the finish up button is clicked 
before the name and dob both isnt enetered then handle there itself okay..and once its finished up set Profile-detail status to complete 
for users who have submitted their names and their date of births , the only remaining thing to complete their profile is the image or profile picture upload 
 */

/*before displaying this component the things that has to be checked  */


export const ImageForm = () => {

  const { user } = useUser();
  const { userInfo } = useUser();
  const { setUserInfo } = useUser();
  const [selectedImage , setSelectedImage] = useState(null);

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    const input = document.getElementById("file-input");
    const selectedFile = input.files[0];

    console.log("Selected File: ", selectedFile);

    const formdata = new FormData();
    formdata.append("profilePic", selectedFile);

    const userToken = extractToken("jwtToken");

    console.log(
      `this is what formdata looks like ${(formdata)} and ${ userToken && userToken } \n`
    );

    try {
      const response = await axios
        .post("http://localhost:6012/media/profilePicUpload", formdata, {
         headers: {
          Authorization: `${userToken}`
         }
        })
        .then((response) => {
          console.log(`response data from profilePicUpload endpoint  --- ${response.data}`);
          alert(`${response.data.message}`);
        });
    } catch (error) {
      console.log(
        `${error} -- error happened while sending post request to profilePicUpload endpoint \n `
      );
    }
    setSelectedImage(null);
  };

  const handleFileInputChange = (event) => {

    const file = event.target.files[0];

    setSelectedImage(file);

  }

  const labelStyle = {
    backgroundImage: selectedImage ? `url${URL.createObjectURL(selectedImage)}` : null,
  };

  console.log(`labelStyle --- ${labelStyle.backgroundImage} --- \n`)

  return (
    <form
      id="ImageForm-SubMain"
      className="flex flex-col justify-center items-center w-64 p-4 bg-slate-300 shadow-lg rounded-md"
      onSubmit={handleImageSubmit}
      enctype="multipart/form-data"
    >
      <h2>Upload Profile</h2>
      <label className="flex flex-col justify-center items-center relative w-20 h-20 sm:w-32 sm:h-32 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 ">
        <span className="flex flex-row justify-center items-center text-center">
          Choose File
        </span>
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          id="file-input"
          name="profilePic"
          onChange={handleFileInputChange}
        />
        <img
          src= "./images/dudeprofile.webp"
          className="absolute w-full h-full rounded-full "
          alt=""
        />
      </label>

      <button
        id="upload-profile-pic-btn"
        className="flex relative"
        type="submit"
      >
        <IosShareIcon
          className="relative w-full h-full m-2 bg-blue-500 p-1 rounded-md"
          fontSize="large"
        ></IosShareIcon>
      </button>
    </form>
  );
};
