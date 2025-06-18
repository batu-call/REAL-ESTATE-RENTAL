"use client"
import { ReactNode,createContext, useContext, useState } from "react"

 type Home = {
    id:number,
    title:string,
    price?:number,
    description?:string,
    location?:string,
    image_url?:string
 }


    type homeModalContextType = {
        selectedHome: Home | null
        openModel: (home : Home) => void
        closeModel: () => void
    }


    const HomeModelContext = createContext<homeModalContextType | undefined>(undefined);

    export const HomeModalProvider  = ({children}: {children:ReactNode}) => {
        const [selectedHome ,setSelectedHome] = useState<Home | null>(null);

        const openModel = (home:Home) => setSelectedHome(home);
        const closeModel = () => setSelectedHome(null);


        return (
            <HomeModelContext.Provider  value={{selectedHome,openModel,closeModel}}>
                {children}
            </HomeModelContext.Provider>
        )
    }

    export const useHomeModel = () => {
        const context = useContext(HomeModelContext)
        if(!context) {
              throw new Error('useHomeModal must be used within a HomeModalProvider') 
        }
        return context
    }