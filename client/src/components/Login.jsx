import React, { useState,useEffect, useContext } from "react";
import axios from "axios";
import { useUser } from "../apis/ContextApi";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Login = (  ) => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ unsuccessfull , setUnsuccessfull ] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [inputType, setInputType] = useState("password");
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await axios.post("http://localhost:6012/auth/login", {
      username,
      password,
    });
    const token = response.data.token; // Get the JWT token from the response

    if (token) {
      // Set the token as a secure HttpOnly cookie
      document.cookie = `jwtToken=${encodeURIComponent(
        token
      )}; SameSite=Strict; Max-Age=3600`;

      setUser({ token });

      console.log(token, " --- this is the token\n");
      navigate("/profile")
    } else {
      console.log(`login was unsuccessfull! \n`);
      setUnsuccessfull(true);
    }

    
  };

   const showVisibilityOff = (ev) => {
     ev.preventDefault();
     setInputType("text");
     setVisibility(false);
   };

   const showVisibilityOn = (ev) => {
     ev.preventDefault();
     setVisibility(true);
     setInputType("password");
   };

  return (
    <form
      method="post"
      className="flex flex-col items-center justify-evenly bg-white  shadow-lg w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <p className="flex flex-row mb-2 p-2 text-black justify-center text-center text-xl sm:text-2xl ">
        Login
      </p>
      <input
        type="text"
        placeholder="username"
        value={username}
        className="block mb-2 p-2 w-full sm:w-2/3 "
        onChange={(event) => setUsername(event.target.value)}
      />
      <div
        id="password_div"
        className="flex flex-row w-2/3 sm:w-3/4  justify-evenly"
      >
        <input
          type={inputType}
          value={password}
          placeholder="password"
          className="block  w-3/4  mb-2 p-2"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="block relative w-1/4 m-2">
          {visibility ? (
            <VisibilityIcon fontSize="medium" onClick={showVisibilityOff} />
          ) : (
            <VisibilityOffIcon fontSize="medium" onClick={showVisibilityOn} />
          )}
        </div>
      </div>
      <button className="bg-white text-black text-sm block w-1/2 rounded-sm p-2 ">
        Login
      </button>
      {unsuccessfull ? (
        <div className="bg-white flex flex-row w-full h-6">
          {" "}
          <div className="w-1 bg-red-700"></div> Login was unsuccessfull
        </div>
      ) : null}
    </form>
  );
};
