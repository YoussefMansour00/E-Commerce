import { createContext, useState } from "react";





export const counterContext = createContext();

export default function CounterProvider({children}){

    const [Counter, setCounter] = useState(0)

    return <counterContext.Provider value={{ Counter,setCounter}}>
    {children}
    </counterContext.Provider>
}



