import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../apis/ContextApi";
import { extractToken } from "../functions/extractToken";


export const SetProfile = ({proceed }) => {

  

  const { userInfo } = useUser();
  const { setUser } = useUser();
  const { user } = useUser();


  /*send the token of the current logged in user and find out whether or 
  not their profile is incomplete */

  
  return (
    <div
      id="setprofile"
      className= "flex flex-col w-screen justify-evenly font-bold bg-slate-200"
    >
      {
        <div>
          <h2 className="text-3xl text-slate-900">
            Finish Setting Up Your{" "}
            <span className="text-slate-600">Profile</span>{" "}
          </h2>
          <button
            onClick={proceed}
            className="w-6 text-center text-slate-400 rounded-md"
          >
            Proceed
          </button>
        </div>
      }
    </div>
  );
};
