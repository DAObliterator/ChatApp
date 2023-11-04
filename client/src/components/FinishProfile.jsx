import React , { useState , useEffect} from "react";
import { extractToken } from "../functions/extractToken";
import axios from "axios";


export const FinishProfile = ({proceed}) => {

    const [nickname , setNickname ] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const userToken = extractToken("jwtToken");

    const finishUp = (e) => {

        e.preventDefault();

        axios.post("http://localhost:6012/profile/editProfile" , { nickname , dateOfBirth} , {
            headers: {
                Authorization: userToken
            }
        }).then((response)=> {
            console.log(` response data from the editProfile --- ${response.data} --- \n`)
        }).catch((err) => {
            console.log(`err happened while fetching resource from the editProfile endPoint --- \n `)
        })


    }


  return (
    <div
      id="FinishProfile-Main"
      className="w-screen h-screen flex flex-col justify-evenly"
    >
      <div
        id="FinishProfile-Heading-Div"
        className="h-1/6 flex flex-row justify-center items-center "
      >
        <h1
          id="FinishUp-Heading"
          className="text-xl text-center text-slate-700"
        >
          Finish Up <span className="text-slate-400">Setting Up</span> Your
          Profile{" "}
        </h1>
      </div>
      <form
        action=""
        id="FinishProfile-form"
        className="flex flex-col w-5/6 p-2 sm:p-4"
        onSubmit={ (e) =>  finishUp(e)}
      >
        <div id="nickname-div" className="flex flex-row w-3/4 justify-evenly">
          <label htmlFor="nickname-input" id="nickname-label" className="w-1/2">
            Whats Your Nickname
          </label>
          <input type="text" id="nickname-input" className="w-1/2" onChange={ (e) => setNickname(e.target.value)} />
        </div>
        <div
          id="dateOfBirth-div"
          className="flex flex-row w-3/4 justify-evenly"
        >
          <label
            htmlFor="dateOfBirth-input"
            id="dateOfBirth-label"
            className="w-1/2"
          >
            Enter Your Date Of Birth
          </label>
          <input type="date" id="dateOfBirth-input" className="w-1/2" onChange={ (e) => setDateOfBirth(e.target.value)} />
        </div>
        <button id="FinishProfile-submit-btn" className="w-1/4 bg-blue-600 text-white text-sm" type="submit" >Finish Up</button>
      </form>
    </div>
  );
};
