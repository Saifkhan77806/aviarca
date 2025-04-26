"use client";

import { useSession } from "next-auth/react";


export const ClientUser = () =>{
    const session = useSession()

    return session?.data;
}