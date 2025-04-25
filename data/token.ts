import { db } from "@/lib/db"


export const getForgotToken = async (token: string) =>{
    const tokensData = await db.forgotPasswordToken.findUnique({
        where:{token}
    })

    return tokensData
}