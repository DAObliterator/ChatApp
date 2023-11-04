import React , { useState , useRef } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import "./Authentication.css";

export const Authentication = () => {

    const existingUser = {
        message: "Create An Account",
        button_txt: "SIGNUP"
    };
    const newUser = {
      message: "Already Registered?",
      button_txt: "LOGIN",
    };

    const [ loginOrSignup , setLoginOrSignup ] = useState(existingUser.message);
    const [loginOrSignupBtn , setLoginOrSignupBtn ] = useState(existingUser.button_txt)
    const slidingDivRef = useRef(null);

    const handleClick = (ev) => {

        ev.preventDefault();

        if ( loginOrSignup === existingUser.message ) {
            setLoginOrSignup(newUser.message);
            setLoginOrSignupBtn(newUser.button_txt);
            /* make sliding div move to the right when you toggle the btn or something like that */

            if ( slidingDivRef.current ) {
                 slidingDivRef.current.style.animationName = "sliding-right";
                 slidingDivRef.current.style.animationDuration = "0.5s";
                 slidingDivRef.current.style.animationFillMode = "forwards";
            }
             
        } else {
            setLoginOrSignup(existingUser.message);
            setLoginOrSignupBtn(existingUser.button_txt);
             

             if ( slidingDivRef.current ) {
                slidingDivRef.current.style.animationName = "sliding-left";
                slidingDivRef.current.style.animationDuration = "0.5s";
                slidingDivRef.current.style.animationFillMode = "backwards";
             }
        }

    }

  return (
    <div id="Log-Reg-Main" className="flex justify-center items-center h-screen bg-slate-200 rounded-md">
      <div id='Log-Reg-SubMain' className='flex flex-row w-1/2 rounded-md absolute'>
        <div id="sliding-div" className='w-1/2 flex flex-col justify-evenly items-center text-white' ref={slidingDivRef}>
            <h1 id="login-or-signup" className='flex items-center'>
                {loginOrSignup}
            </h1>
            <button id="login-or-signup-btn" onClick={handleClick} className='bg-blue-300 w-16 rounded-md' >
                {loginOrSignupBtn}
            </button>
        </div>
        <div id="Register" className="w-1/2">
          <Register></Register>
        </div>
        <div id="Login" className="w-1/2">
          <Login></Login>
        </div>
      </div>
    </div>
  );
}
