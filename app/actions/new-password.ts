'use server';
import { getForgotToken } from '@/data/token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { forgotPasswordSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import * as z from 'zod'

export const newPassword = async (values: z.infer<typeof forgotPasswordSchema>, token: string  ) =>{

    const validateData = forgotPasswordSchema.safeParse(values);

    if(!validateData.success) return {error: "Invalid fields"}

    const {password, cpassword} = validateData.data;

    if(password !== cpassword) return {error: "Please enter password and confimr password as same as !"}

    const tokensData = await getForgotToken(token);

    if(!tokensData) return {Error: "Invalid token"}

    if(new Date(tokensData.expiry) < new Date()) return {Error: "Token is expired !"}

    const existingUser = await getUserByEmail(tokensData.email);

    if(!existingUser) return {Error: "User not found"}

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    })

    await db.forgotPasswordToken.delete({
        where: {id: tokensData.id}
    })

    return {Success: "Password is reset !"}










}