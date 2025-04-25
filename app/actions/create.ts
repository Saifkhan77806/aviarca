'use server';
import { db } from "@/lib/db";
import { formSchema } from "@/schema";
import * as z  from "zod";
import bcryptjs from 'bcryptjs'


export const create = async (values: z.infer<typeof formSchema>) =>{

    const validateData = formSchema.safeParse(values);

    if(!validateData.success){
        return {error: "Invalid fields"}
    }

    const {username, email, password, phone, address, position, salary} = validateData.data;

    const hashedPassword = await bcryptjs.hash(password, 10); 

    await db.user.create({
        data:{
            name: username,
            email: email,
            password: hashedPassword,
            phone: String(phone),
            address: address,
            position: position,
            salary: salary
        }
    })

    return {success: "User is created"}




}