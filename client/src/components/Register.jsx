import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginComponent, setLoginComponent] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { data } = await axios.post("http://localhost:6012/auth/register", {
      username,
      password,
    });

    if (data.message = "User created successfully!") {
      alert("User created successfully!");
    }
  };

  const showVisibilityOff = (ev) => {
    ev.preventDefault();
    setInputType("text")
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
      className="flex flex-col items-center justify-evenly bg-white shadow-lg w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <p className="flex flex-row mb-2 p-2 text-black justify-center text-center text-xl sm:text-2xl">
        Register
      </p>
      <input
        type="text"
        placeholder="username"
        value={username}
        className="block sm:w-3/4 w-2/3 mb-2 p-2"
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

      <button className="bg-white text-black text-sm block w-1/2 rounded-sm p-2">
        Register
      </button>
    </form>
  );
};
