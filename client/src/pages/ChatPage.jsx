import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { extractToken } from "../functions/extractToken";
import { useUser } from "../apis/ContextApi";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const ChatPage = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [userInfoArray, setUserInfoArray] = useState(null);
  const { otherUserId } = useParams();
  const [loggedInUserMessages, setLoggedInUserMessages] = useState(null);
  const [otherUserMessages, setOtherUserMessages] = useState(null);
  const [messages, setMessages] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessageArray, setSentMessageArray] = useState([]);
  const [allOtherUsers, setAllOtherUsers] = useState([]);
  const [allOtherUsersImm, setAllOtherUsersImm] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [sentMessage, setSentMessage] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const userToken = extractToken("jwtToken");
  const socket = io("http://localhost:6012", {
    auth: {
      token: userToken,
    },
  });

  const { id } = useParams();

  const handleChatClick = (userId) => {
    console.log(
      `this chat has these two participants - ${id} and ${userToken} `
    );

    navigate(`/chats/userId/${userId}`);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    //render the chat of the loggedinUser and the user with the id  -- (otherUserId)
    //also render all the chats ie previous chats of the loggedIn User ...
    const config = {
      headers: {
        Authorization: userToken,
      },
    };

    axios
      .get(`http://localhost:6012/users/allOtherUsers`, config)
      .then((response) => {
        console.log(
          `response data from the /users/allOtherUsers endpoint --- ${response.data} \n`
        );
        setAllOtherUsers(response.data);
        setAllOtherUsersImm(response.data);
      })
      .catch((err) => {
        console.log(`err happened while fetching allOtherUsers ---\n`);
      });
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: userToken,
      },
    };

    axios
      .get(`http://localhost:6012/users/otherUser?userId=${id}`, config)
      .then((response) => {
        console.log(
          `response data from the /users/otherUser ( ie the otherUser doc ) --- ${JSON.stringify(
            response.data
          )} \n`
        );
        setOtherUser(response.data);
      })
      .catch((err) => {
        console.log(`err happened while fetching otherUser info ---\n`);
      });
      
  }, []);

  socket.on("message", (message) => {
    // Update the state with the received message
    console.log(`receivedMessage -- ${message} \n`);
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
    setAllMessages((prevMessages) => [...prevMessages, message]);
  });

  const handleChangeUsername = (ev) => {
    ev.preventDefault();

    const updatedUserName = ev.target.value;

    if (updatedUserName) {
      // Filter the users only if there is a search query
      const filteredArray = allOtherUsers.filter((element) =>
        element.username.includes(updatedUserName)
      );
      setAllOtherUsers(filteredArray);
    } else {
      setAllOtherUsers(allOtherUsersImm);
    }

    /*setEnteredUsername((prevUsername) => {
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
    });*/
  };

  const enteredMessage = (ev) => {
    ev.preventDefault();
    setSentMessage(ev.target.value);
  };

  const handleSendingMessage = (ev) => {
    ev.preventDefault();

    console.log(
      sentMessage,
      `sentMessage inside of handleSendingMessage --- \n`
    );

    const sentText = {
      message: sentMessage,
      recipientId: id,
      time: new Date(),
    };

    socket.emit("chatMessage", sentText);

    setAllMessages((prevMessages) => [...prevMessages, sentText]);
    setSentMessageArray((prevMessages) => [...prevMessages, sentText]);
  };

  return (
    <div
      id="Chat-Page-Main"
      className="w-screen h-screen flex flex-row bg-gray-100"
    >
      {console.log(allMessages , " --- allMessages \n") }
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
                  <a className="hover-" href={`/users/userId/${element._id}`}>
                    {element.username}
                  </a>{" "}
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
          onSubmit={(ev) => handleSendingMessage(ev)}
        >
          <input
            type="text"
            id="send-message-input"
            className="bg-white w-3/4 rounded-md p-2 focus:outline-none"
            onChange={(ev) => enteredMessage(ev)}
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
        <div className="main-chat w-full h-3/4 bg-gray-100 flex ">
          <div className="flex flex-col w-full h-full overflow-auto">
            {allMessages
              .sort((a, b) => new Date(a.time) - new Date(b.time))
              .map((element) => {
                return (
                  <div
                    id="TextMessage-div"
                    style={{
                      justifyContent:
                        element.recipientId !== id ? "flex-end" : "flex-start",
                      alignItems:
                        element.recipientId !== id ? "flex-end" : "flex-start",
                      backgroundColor:
                        element.recipientId !== id
                          ? "rgb(220, 215, 247)"
                          : "rgb(182, 194, 204)",
                    }}
                    className="w-1/2 h-100 bg-blue-200 rounded-md p-2 m-2"
                  >
                    {" "}
                    <ul>{element.message}</ul>{" "}
                  </div>
                );
              })}
          </div>
        </div>
        <div
          id="Receiver-Info"
          className="w-full bg-gray-200 flex-grow p-4 flex flex-row"
        >
          {/* Additional receiver info can go here */}
          <div
            id="OtherUser-ProfileInfo"
            className="h-full w-1/2 flex flex-row"
          >
            <div
              id="OtherUser-profilepic-div"
              className="h-full w-1/2 flex justify-center items-center"
            >
              <img
                src={otherUser.profilepic}
                alt=""
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div id="OtherUser-username" className="h-full w-1/2 text-lg">
              {otherUser.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
