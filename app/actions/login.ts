'use server';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { loginSchema } from '@/schema';
import { AuthError } from 'next-auth';
import * as z from 'zod'

export const login = async (values: z.infer<typeof loginSchema>) =>{

    const validateData  = loginSchema.safeParse(values)

    if(!validateData.success) return {error: "Invalid fields"}

    const {email, password} = validateData.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser) return {error: "User not found"}

    try{

       await signIn("credentials",{
            email,
            password,
            redirectTo: "/dashboard"
        })

    }catch(err){

        if(err instanceof AuthError){
            switch(err.message){
                case "CredentialsSignin":
                    console.log("login error message", err.message)
                    return { error: "Invalid Credentails" }
            }
                return { error: "Something went wrong !" }

           
        }

        throw err;
    }

    


    return {success: "Login Successfull !"}

}