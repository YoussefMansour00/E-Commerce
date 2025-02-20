import { createContext, useState } from "react";




export const authContext = createContext();

export default function AuthProvider({ children }){

    const [IsLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("Token") != null);
    return<authContext.Provider value={{IsLoggedIn,setIsLoggedIn}}>
        {children}
    </authContext.Provider>
}




