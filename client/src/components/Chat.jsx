import React , { useState , useEffect } from "react";

export const Chat = () => {
  return (
    <div className="flex flex-row w-screen " id="chat-main">
      <ul id="chats-" className="flex flex-col pt-2 w-1/3">
        <li className=" flex flex-row m-4 justify-evenly">
          <img
            src="/images/mrbeast.webp"
            alt="mrbeast"
            className=" w-20 h-20 rounded-full"
          />
          <div className="flex items-center" id="chat-username">
            <p className="text-slate-900 sm:text-sm ">Mr Beast</p>
          </div>
        </li>
        <li className="flex flex-row m-4 justify-evenly">
          <img
            src="/images/josh.jpeg"
            alt="josh"
            className="w-20 h-20 rounded-full "
          />
          <div className="flex items-center" id="chat-username">
            <p className="text-slate-900 sm:text-sm ">josh</p>
          </div>
        </li>
        <li className="flex flex-row justify-evenly m-4">
          <img
            src="/images/mrsjhonson.webp"
            alt="mrsjhonson"
            className=" w-20 h-20 rounded-full"
          />
          <div className="flex items-center" id="chat-username">
            <p className="text-slate-900 sm:text-sm ">Mrs Jhonson</p>
          </div>
        </li>
        <li className="flex flex-row justify-evenly m-4">
          <img
            src="/images/istockphoto-1300512215-612x612.jpg"
            alt="brandon"
            className=" w-20 h-20 rounded-full"
          />
          <div className="flex items-center" id="chat-username">
            <p className="text-slate-900 sm:text-sm ">Brandon</p>
          </div>
        </li>
        <li className="flex flex-row justify-evenly m-4 ">
          <img
            src="/images/ishowspeed.jpeg"
            alt="ishowspeed"
            className=" w-20 h-20 rounded-full "
          />
          <div className="flex items-center" id="chat-username">
            <p className="text-slate-900 sm:text-sm ">Darren Watkins</p>
          </div>
        </li>
      </ul>
      <div id="chat" className="flex-col"></div>
    </div>
  );
};
