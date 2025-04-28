'use server'

import { serverUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { noticeSchema } from "@/schema"
import { redirect } from "next/navigation"
import { z } from "zod"

type UserData = {
    name: String,
    email: String,
    role: "EMPLOYEE" | "MANAGER",
    phone: String,
    address: String,
    salary: Number
}

export const getNotice = async () => {
    const notices = await db.notice.findMany();
    const user = await serverUser();
  
    // Filter notices where notice.forWho === user.role

    if(user?.role === "OWNER"){
        return notices
    }

    const filteredNotices = notices.filter((notice) => notice.forWho === user?.role );

  
    return filteredNotices;
  };

export const addNotice = async (values: z.infer<typeof noticeSchema>) =>{

    const user = await serverUser();

    if(!user) {redirect("/login")}
  

    const validateData = noticeSchema.safeParse(values)

    if(!validateData.success) { return {error: "Invalid fields"} }

    const { subject, role, description } = validateData.data

    if(user?.role === "EMPLOYEE") return {error: "You are not allowed to created notice"}


      await db.notice.create({
        data:{ subject, role: user?.role, description, forWho: role }
    })

    return {success: "Notice is created !"}

}
  