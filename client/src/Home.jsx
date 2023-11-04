import React, { useState } from "react";
//import { Card } from "./components/Card";


export const Home = () => {

 

  return (
    <div
      id="Home-Main"
      className="flex flex-col w-screen justify-evenly items-center mt-16"
      
    >
      <div
        id="details-main-1"
        className="flex flex-col items-center justify-evenly text-slate-900 text-4xl sm:text-6xl"
      >
        Welcome to the <span className="text-slate-300"> Home Page</span>
      </div>
      <div
        id="details-main-2"
        className="flex flex-row text-2xl sm:text-4xl m-6 sm:m-12 "
      >
        <div id="About-Main" className="w-2/3">
          <h1 id="About-App-heading">
            About the <span className="text-slate-600 ">App</span>
          </h1>
          <p id="App-info" className="text-sm sm:text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        
      </div>
      <div
        id="details-main-3"
        className=" flex flex-col justify-evenly text-2xl sm:text-4xl m-6 sm:m-12"
      ></div>
    </div>
  );
};
