import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UserContext = createContext(); //used to create a new Context Object

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const getCookie = (name) => {
    const cookies = document.cookie;

    let cookieArray = cookies.split(";").map((cookie) => cookie.trim());

    for (const cookie of cookieArray) {
      if (cookie.startsWith(name + "=")) {
        const token = cookie.substring(name.length + 1);

        return token;
      }
    }

    return null;
  };

  useEffect(() => {
    const token = getCookie("jwtToken");
    if (token) {
      setUser({ token });

      const config = {

        headers: {
          Authorization: token,
        },
        
      };

      console.log(
        `token --- ${token} and config --- ${JSON.stringify(config)} \n`
      );

      axios
        .get("http://localhost:6012/profile/setProfile", config)
        .then((response) => {
          console.log(
            `This is the response data from the setProfile endpoint --- ${JSON.stringify(
              response.data
            )} \n`
          );
          setUserInfo(response.data);
        });

      
    }
  }, []);

  useEffect(() => {
    console.log(
      ` user -- ${JSON.stringify(user)} and userInfo -- ${JSON.stringify(
        userInfo
      )} \n`
    );
  }, [user, userInfo]);

  return (
    <UserContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
}; // returns an object { user:someUserData , setUser: someSetUserFunction }
