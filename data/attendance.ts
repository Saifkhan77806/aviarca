import { db } from "@/lib/db"


export const getAttendanceData = async (userId: string) =>{
    const data = await db.attendance.findMany({
        where:{ userId },
        orderBy: {year: 'asc'}
    })

    return data
}