import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { useUser } from "../apis/ContextApi";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ChatPage = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [userInfoArray, setUserInfoArray] = useState(null);
  const { otherUserId } = useParams();
  const [loggedInUserMessages, setLoggedInUserMessages] = useState(null);
  const [otherUserMessages, setOtherUserMessages] = useState(null);
  const [messages, setMessages] = useState(null);
  const [ allOtherUsers , setAllOtherUsers ] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const userToken = user && user.token;

  const { id } = useParams();

  const handleChatClick = (userId) => {

    console.log(`this chat has these two participants - ${id} and ${userToken} `)
    

   navigate(`/chats/userId/${userId}`);
  

  }

  useEffect(() => {
    //render the chat of the loggedinUser and the user with the id  -- (otherUserId)
    //also render all the chats ie previous chats of the loggedIn User ...
    const config = {
      headers: {
        Authorization: userToken,
      },
    };

    /*axios
      .get(`http://localhost/6012/users/otherUser/userId=${id}`, config)
      .then((response) => {
        console.log(
          `response data from the /chats/ endpoint --- ${response.data} \n`
        );
      })
      .catch((err) => {
        console.log(`err happened while fetching chats ---\n`);
      });*/

    

    axios
      .get(`http://localhost:6012/users/allOtherUsers`, config)
      .then((response) => {
        console.log(
          `response data from the /users/allOtherUsers endpoint --- ${response.data} \n`
        );
        setAllOtherUsers(response.data);
      })
      .catch((err) => {
        console.log(`err happened while fetching allOtherUsers ---\n`);
      }); 
  }, []);

  const handleChangeUsername = async (ev) => {
    ev.preventDefault();

    const updatedUserName = ev.target.value;

    setEnteredUsername((prevUsername) => {
      if (updatedUserName !== prevUsername) {
        axios
          .post("http://localhost:6012/profile/findUser", {
            userToken,
            username: updatedUserName,
          })
          .then((response) => {
            console.log(
              `response from the findUser endpoint (inside of ChatPage) --- ${JSON.stringify(
                response.data
              )}\n`
            );
            setUserInfoArray(response.data);
          })
          .catch((error) => {
            console.error("Error (inside of ChatPage) :", error);
          });
        return updatedUserName;
      }
      return prevUsername;
    });
  };

  const handleSendingMessage = () => {};

  return (
    <div
      id="Chat-Page-Main"
      className="w-screen h-screen flex flex-row bg-gray-100"
    >
      <div
        id="Chat-List"
        className="w-1/3 flex flex-col bg-gray-200 m-4 rounded-md shadow-lg"
      >
        <div className="flex rounded-t-md bg-teal h-16 items-center text-center justify-center text-gary-600 text-xl font-semibold">
          Search Users
        </div>
        <div className="flex flex-row w-full p-2">
          <input
            id="search-chats"
            className="w-3/4 h-12 m-2 rounded-md p-2 focus:outline-none bg-gray-300"
            onChange={(ev) => handleChangeUsername(ev)}
            placeholder="Search for users"
          />
          <div
            id="SearchIcon-Wrapper-div"
            className="flex w-1/6 items-center justify-center p-2 bg-gray-200 rounded-md"
          >
            <button className="w-full ">
              <SearchIcon fontSize="medium" className="text-slate-800" />
            </button>
          </div>
        </div>
        <div id="UserList" className="flex w-full flex-col overflow-auto">
          {allOtherUsers.map((element) => {
            return (
              <div
                className="w-full flex flex-row sm:m-4 m-2 hover:bg-slate-300 p-2"
                key={element._id}
                onClick={(e) => handleChatClick(element._id)}
              >
                <div id="profile-pic" className="h-full w-1/3">
                  <img
                    src={element.profilepic}
                    alt=""
                    className="h-10 w-10 sm:h-16 sm:w-16 rounded-full"
                  />
                </div>
                <div className="text-xs sm:text-sm m-2 flex flex-col ">
                  {" "}
                  <a className="hover-" href={`/users/userId/${element._id}`} >{element.name}</a>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        id="Current-Chat"
        className="w-2/3 flex flex-col-reverse bg-gray-200 m-4 rounded-md shadow-lg"
      >
        <form
          id="send-message-form"
          className="w-3/4 h-16 flex flex-row m-2 justify-between items-center rounded-md"
          onSubmit={() => handleSendingMessage}
        >
          <input
            type="text"
            id="send-message-input"
            className="bg-white w-3/4 rounded-md p-2 focus:outline-none"
            onChange={(e) => setSentMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            id="send-message-button"
            className="w-1/4 h-10 bg-blue-600 m-2 rounded-md text-white hover:bg-blue-700"
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="main-chat w-full h-3/4 bg-gray-100">
          {/* Chat messages can be styled here */}
        </div>
        <div id="Receiver-Info" className="w-full bg-gray-200 flex-grow p-4">
          {/* Additional receiver info can go here */}
        </div>
      </div>
    </div>
  );
};
