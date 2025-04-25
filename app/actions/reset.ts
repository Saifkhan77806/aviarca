'use server';
import { generatePasswordToken } from '@/data/password';
import { getUserByEmail } from '@/data/user';
import { passwordResetEmail } from '@/email/text';
import { forgotPasswordEmailSChema } from '@/schema';
import * as z from 'zod'

export const reset = async (values: z.infer<typeof forgotPasswordEmailSChema>) =>{

    const  validateData = forgotPasswordEmailSChema.safeParse(values);

    if(!validateData.success) return {error: "Invalid fields"}

    const { email } = validateData.data

    const existingUser = await getUserByEmail(email);

    if(!existingUser) return {Error: "User not found"}

    const passwordToken = await generatePasswordToken(email)

    await passwordResetEmail(passwordToken.token, passwordToken.email);

    return {success: "Email sent successfully"}

    

    


}