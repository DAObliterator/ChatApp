import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { useUser } from "../apis/ContextApi";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
  const { id } = useParams();
  const [otherUserinfo, setOtherUserinfo] = useState({});
  const {user} = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:6012/users?userId=${id}&currentUser=${user}`)
      .then((response) => {
        setOtherUserinfo(response.data);
        console.log(
          `this is the response data about the 
          otherUser - ${JSON.stringify(response.data)} \n`
        );
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [id]);

  const handleMessageClick = (ev) => {

    ev.preventDefault();

    console.log(`click ev fired, the sender._id (encrypted) - ${user.token} the reciever._id - ${id} \n`);

    navigate(`/chats/userId/${id}`);

  }

  return (
    <div
      id="UserPage-Main-div"
      className="w-screen h-screen flex flex-col bg-grey-300"
    >
      <div
        id="UserPage-SubMain-1"
        className="h-2/5 w-full  flex flex-row"
      >
        <div
          id="UserCard"
          className="h-2/3 w-1/2 flex flex-row m-4  rounded-md bg-gray-100 shadow-md"
        >
          <div
            id="UserPage-Image-Wrapper-Div"
            className="flex justify-center items-center w-1/2 m-4"
          >
            <img
              src={otherUserinfo.profilepic}
              alt=""
              className="w-24 h-24 sm:h-40 sm:w-40 rounded-full "
              id="ProfilePic"
            />
          </div>
          <div
            id="UserPage-otherUserinfo-div"
            className="flex flex-col justify-center items-center sm:text-sm text-xs w-1/3"
          >
            <ul id="UserPage-UserDetails-list">
              <li> {otherUserinfo.username} </li>
              <li> {otherUserinfo.name} </li>
              <li> {otherUserinfo.dateOfBirth} </li>
            </ul>
            <button id="Message-btn" className="w-full sm:w-1/2 rounded-md bg-blue-600 shadow-md text-xs sm:text-sm text-slate-200 hover:bg-blue-400" onClick={ (ev) => handleMessageClick(ev)}  >Message</button>
          </div>
        </div>
      </div>
      <div
        id="UserPage-SubMain-2"
        className="h-3/5 w-full "
      ></div>
    </div>
  );
};
