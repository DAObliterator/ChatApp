import { useState } from "react";
import axios from "axios";
import { Register } from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from "./Home";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { Profile } from "./components/Profile";
import { UserProvider } from "./apis/ContextApi";
import { Authentication } from "./components/Authentication";
import { useUser } from "./apis/ContextApi";
import { extractToken } from "./functions/extractToken";
import { Explore } from "./components/Explore";
import { UserPage } from "./components/UserPage";
import { ChatPage } from "./pages/ChatPage";
import { Profile1 } from "./components/Profile1";

function App() {
  //axios.defaults.baseURL = "http://localhost:6012";
  //axios.defaults.withCredentials = true; // so that we can set cookies at the api

  /*const { user } = useUser() || null;

  const userToken = user && user.token;*/

  const userToken = extractToken("jwtToken");

  const [themeChangeBtnClicked, setThemeChangeBtnClicked] = useState(false);

  const handleThemeChange = () => {
    setThemeChangeBtnClicked(!themeChangeBtnClicked);
  };

  const layoutColor = {
    backgroundColor: `${themeChangeBtnClicked ? "white" : "gray"} `,
  }

  return (
    <div className="flex flex-col font-mono justify-center items-center" style={layoutColor}>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/register"
              element={<Authentication></Authentication>}
            ></Route>
            <Route path="/" element={<Home></Home>}></Route>
            {userToken ? (
              <Route path="/profile" element={<Profile1 />} />
            ) : (
              <Route path="/redirect" element={<Navigate to="/" />} />
            )}
            {userToken ? (
              <Route path="/explore" element={<Explore />} />
            ) : (
              <Route path="/redirect" element={<Navigate to="/" />} />
            )}
            {userToken ? (
              <Route path="/users/userId/:id" element={<UserPage />} />
            ) : (
              <Route path="/redirect" element={<Navigate to="/" />} />
            )}
            {userToken ? (
              <Route path="/chats/userId/:id" element={<ChatPage />} />
            ) : (
              <Route path="/redirect" element={<Navigate to="/" />} />
            )}
          </Routes>
        </Router>
      </UserProvider>
      <button
        id="Home-Main-btn"
        onClick={handleThemeChange}
        className="h-16 w-16 rounded-md bg-blue-600 hover:bg-blue-800 text-sm text-white"
      >
        Change Theme
      </button>
    </div>
  );
}

export default App;
