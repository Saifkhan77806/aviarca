"use client";

import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";


import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa";
import { ClientUser } from "@/lib/client-user";
import { LougoutButton } from "./LogoutBtn";

export const UserButton =  () =>{

    const session = ClientUser()
    console.log(session?.user?.email)

    return (
        <>
       <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={session?.user?.id as string} />
                <AvatarFallback className="bg-sky-500">
                    <FaUser className="text-white" />
                    </AvatarFallback>
            </Avatar>
            <p></p>
                    
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <LougoutButton>
                <DropdownMenuItem>
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    log
                    
                </DropdownMenuItem>
                </LougoutButton>
        </DropdownMenuContent>
       </DropdownMenu>
       </>
    )
}

// https://picsum.photos/200/300