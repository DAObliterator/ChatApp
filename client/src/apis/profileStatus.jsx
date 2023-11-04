import { useState , useEffect , createContext , useContext} from "react";

export const profileStatus = createContext();

export const profileProvider = ({children}) => {

    const [ profile , setProfile] = useState({});


    <profileStatus.Provider value={ {profile , setProfile} }>
        {children}
    </profileStatus.Provider>

}

//custom Hook

export const useProfileStatus = () => {
    return useContext(profileStatus)
}