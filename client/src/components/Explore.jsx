import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useUser } from "../apis/ContextApi";
import { useNavigate } from "react-router-dom";

export const Explore = () => {
  const [username, setUsername] = useState("");
  const { user } = useUser();
  const { userInfo } = useUser();
  const { setUserInfo } = useUser();
  const [userInfoArray, setUserInfoArray] = useState(null);

  const navigate = useNavigate();

  console.log(`user.token --- ${user && user.token}\n`);

  //const userToken = extractToken("jwtToken");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(`handleSubmit clicked \n`);
    let updatedUserInfoArray = userInfoArray.filter(element => {
      return element.username.includes(username);
    })

    console.log(`${updatedUserInfoArray} --- updatedUserInfoArray --- \n`);

    setUserInfoArray(updatedUserInfoArray);
  };

  const findUser = async (ev) => {
    ev.preventDefault();

    const userToken = user && user.token;

    const config = {
      headers: {
        Authorization: `${user && user.token}`,
      },
    };

    const updatedUsername = ev.target.value; //current value

    setUsername((prevUsername) => {
      if (updatedUsername !== prevUsername) {
        // is current value ne to old value
        axios
          .post("http://localhost:6012/profile/findUser", {
            userToken,
            username: updatedUsername,
          })
          .then((response) => {
            console.log(
              `response from the findUser endpoint is --- ${response.data}`
            );
            setUserInfoArray(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        return updatedUsername; // current value equal to old value
      }
      return prevUsername;
    });

    if (updatedUsername === "") {
      // Clear userInfoArray when the input is empty
      setUserInfoArray(null);
    }
  };

  const handleProfileRedirect = (user_id) => {

    console.log(user_id , " -- user._id of the clicked element");

    navigate(`/users/userId/${user_id}`); // at this route i want to render a component
    // in which i plan to populate fields by sending an api call immeditaely when the component is rendered

  



  }

  return (
    <div
      id="Explore-Main"
      className="flex flex-col w-screen h-screen bg-slate-200"
    >
      <header
        id="SearchBar-Wrapper-header"
        className="flex flex-row items-start justify-start w-full h-20 p-4"
      >
        <form
          action=""
          id="SearchBar-Form"
          className="flex flex-row w-1/2 p-2 bg-gray-200 shadow-md rounded-md"
          onSubmit={(ev) => handleSubmit(ev)}
        >
          <input
            type="text"
            className="w-2/3 shadow-md rounded-md"
            onChange={findUser}
          />
          <button id="SearchBar-Submit-Button" className="w-32">
            <SearchIcon fontSize="large"></SearchIcon>
          </button>
        </form>
      </header>
      {console.log(` userInfoArray --- ${userInfoArray} -\n`)}
      <div className="rounded-md w-1/3 relative bg-slate-500 ml-4">
        {Array.isArray(userInfoArray) && userInfoArray !== null
          ? userInfoArray.map((element) => (
              <div
                className="flex flex-row  h-16 bg-gray-100 justify-evenly relative w-full ml-0 hover:bg-gray-300"
                key={element._id}
                onClick = { () =>  handleProfileRedirect(element._id)}
              >
                <img
                  src={element.profilepic}
                  alt="profilepic"
                  className="h-12 w-12 rounded-full m-2 "
                />
                <div className="h-full w-1/2 text-sm text-center flex items-center">
                  {element.username}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
