import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../apis/ContextApi";
import HomeIcon from "@mui/icons-material/Home";
import ClearIcon from "@mui/icons-material/Clear";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import LoginIcon from "@mui/icons-material/Login";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import { extractToken } from "../functions/extractToken";
import "./navbar.css";

export const Navbar = () => {
  const { user } = useUser();
  const { setUser } = useUser();
  const { userInfo } = useUser();
  const { setUserInfo } = useUser();

  const [isClicked, setIsClicked] = useState(false);
  const [navbarVisibilty, setNavbarVisibility] = useState(true);
  const hamburgerIcon = useRef(null);
  const navigate = useNavigate();

  //const navBlock = useRef(null);

  const loggedInUserToken = extractToken("jwtToken");



  useEffect(() => {
    console.log(
      `user Context inside of navbar.jsx --- ${loggedInUserToken} \n`
    );
  }, []);

  const handleLogout = (ev) => {
    ev.preventDefault();
    setUser(null);

    document.cookie =
      "jwtToken" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/");
  };

  /*const displayNavbar = (ev) => {

    ev.preventDefault()
    setIsClicked(!isClicked);


  }

  const destroyNavbar = (ev) => {

    ev.preventDefault()
    setIsClicked(!isClicked);

    if (navBlock.current) {
        navBlock.current.style.tarnsition = "ease-in-out";
         navBlock.current.style.tarnsitionDuration = "1s";

    }



  }*/

  const displayNavbar = () => {
    setNavbarVisibility(!navbarVisibilty);
    if ( navbarVisibilty === false) {
      hamburgerIcon.current.style.animationName = "rotate-right-90";
      hamburgerIcon.current.style.animationDuration = "0.5s";
      hamburgerIcon.current.style.animationFillMode = "forwards";
    }
    if (navbarVisibilty === true) {
      hamburgerIcon.current.style.animationName = "rotate-left-90";
      hamburgerIcon.current.style.animationDuration = "0.5s";
      hamburgerIcon.current.style.animationFillMode = "forwards";
    }
  };

  return (
    <div className="navbar-superclass w-screen relative">
      {/*<div
        className="top-0 right-0 w-6 h-6 text-black fixed z-50 mr-16 sm:mr-10"
        onClick={displayNavbar}
      >
        <MenuTwoToneIcon fontSize="medium"></MenuTwoToneIcon>
      </div>*/}
      <div
        id="MenuIcon-wrapper-div"
        className="flex flex-col justify-center items-center fixed h-16 w-16 top-0 left-0 m-4 z-1000"
        onClick={displayNavbar} 
        ref={hamburgerIcon}
      >
        <MenuTwoToneIcon
          color="action"
          fontSize="large"
          className=" hover:text-slate-100 w-full h-full absolute p-0.5 rounded-full border-2 border-slate-500 z-1000"
        ></MenuTwoToneIcon>
      </div>
      {navbarVisibilty && (
        <div id="nav-header-wrapper">
          <header
            className="top-0 right-0 mr-2 fixed bg-slate-600 flex flex-row sm:w-1/3 w-2/3 h-16 rounded-md justify-evenly text-center sm:text-left pr-2 text-white dark:text-black z-2"
            id="navbar-main"
          >
            <Link
              to="/"
              className=" flex flex-row justify-center items-center text-black-900 mt-2 text-sm"
            >
              <div
                id="HomeIcon-wrapper-div"
                className="flex flex-col justify-center items-center relative"
              >
                <HomeIcon
                  color="action"
                  fontSize="large"
                  className=" hover:text-slate-100  absolute w-full h-full p-0.5 rounded-full border-2 border-slate-500"
                ></HomeIcon>
              </div>
            </Link>

            {loggedInUserToken ? (
              <div
                id="logout-btn-div"
                className="flex flex-row justify-center items-center "
              >
                <button
                  className="flex flex-row justify-center bg-slate-900 rounded-md w-10 h-10 text-xs items-center hover:bg-blue-600"
                  onClick={handleLogout}
                >
                  <LogoutIcon fontSize="large"></LogoutIcon>
                </button>
              </div>
            ) : null}

            {loggedInUserToken ? (
              <Link
                to="/explore"
                className="flex flex-row justify-center text-black-900 mt-2 text-sm relative"
              >
                <div
                  id="ExploreRoundedIcon-wrapper-div"
                  className="flex flex-col justify-center items-center relative"
                >
                  <ExploreRoundedIcon
                    color="action"
                    fontSize="large"
                    className=" hover:text-slate-100  absolute w-full h-full p-0.5 rounded-full border-2 border-slate-500"
                  ></ExploreRoundedIcon>
                </div>
              </Link>
            ) : null}

            {loggedInUserToken ? (
              <Link
                to="/profile"
                className=" flex flex-row justify-center text-black-900 mt-2 text-sm relative"
              >
                <div
                  id="PermIdentityIcon-wrapper-div"
                  className="flex flex-col justify-center items-center relative"
                >
                  <PermIdentityIcon
                    color="action"
                    fontSize="large"
                    className=" hover:text-slate-100  absolute w-full h-full p-0.5 rounded-full border-2 border-slate-500"
                  ></PermIdentityIcon>
                </div>
                {/*userInfo.status ? (
                  userInfo.image_status ? null : (
                    <CircleIcon
                      fontSize="small"
                      className="text-green-400 absolute right-0 top-0 "
                    ></CircleIcon>
                  )
                ) : (
                  <CircleIcon
                    fontSize="small"
                    className="text-red-400 absolute right-0 top-0"
                  ></CircleIcon>
                )*/}
              </Link>
            ) : null}
            {loggedInUserToken ? null : (
              <Link
                to="/register"
                className=" flex flex-row justify-center items-center text-black-900 mt-2 text-sm hover:text-slate-900"
              >
                <div
                  id="LoginIcon-wrapper-div"
                  className="flex flex-col items-center justify-center"
                >
                  <LoginIcon
                    fontSize="large"
                    className="absolute w-full h-full p-0.5 rounded-full border-2 border-slate-500"
                  ></LoginIcon>
                </div>
              </Link>
            )}
            {/*loggedInUserToken ? null : (
              <Link
                to="/login"
                className=" flex flex-row justify-center text-black-900 mt-2 text-sm"
              >
                Login
              </Link>
            )*/}
          </header>
        </div>
      )}
    </div>
  );
};
