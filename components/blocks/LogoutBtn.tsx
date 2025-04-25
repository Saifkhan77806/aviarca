import { logout } from "@/app/actions/signout";
import React, { Children } from "react";

interface logoutButtonProps{
    children?: React.ReactNode
}

export const LougoutButton = ({children}: logoutButtonProps) => {
    const onClick = async () =>{
       await logout();
    }

    return(
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    )

}

