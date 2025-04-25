import { db } from '@/lib/db';
import {v4 as uuidv4} from 'uuid'

 const getPasswordTokenByEmail = async (email: string) =>{

    const tokenData = await db.forgotPasswordToken.findFirst({
        where:{
            email
        }
    })

    return tokenData

    
}

export const generatePasswordToken = async (email: string) => {

    const token = uuidv4();

    const expiry = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordTokenByEmail(email);

    if(existingToken){
        await db.forgotPasswordToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const passwordResetToken = await db.forgotPasswordToken.create({
        data:{
            email,
            token,
            expiry
        }
    })

    return passwordResetToken  
    
}


