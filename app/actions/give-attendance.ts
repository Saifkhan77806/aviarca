'use server'

import { getAttendanceData } from "@/data/attendance"
import { getUserByEmail } from "@/data/user"
import { serverUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const giveAtt = async () =>{
    const user = await serverUser()

    const userData = await getUserByEmail(user?.email as string);

    if(!userData) return {Error: "User not found"}

    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const day = new Date().getDate()

    const data = await getAttendanceData(userData.id);



    await db.attendance.create({
        data:{
            userId: userData.id,
            month,
            year,
            day,
            status: "PRESENT"
        }
    })

    return {Success: "Attendance of today is addedd"}

}