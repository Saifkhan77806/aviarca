import { auth } from "@/auth"


export const serverUser = async () =>{
    const user = await auth()

    return user?.user

}