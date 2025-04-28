import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { getUserByEmail } from "@/data/user"
import { NextAuthConfig } from "next-auth"
import { loginSchema } from "./schema"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {
           
            const validateData = loginSchema.safeParse(credentials);

            if(!validateData.success) return null

            const {email, password} = validateData.data

           

            const user = await getUserByEmail(email);

           

            const passwordMatch = await bcryptjs.compare(
                password, user?.password,
            );

           

            if(passwordMatch) return user;

            return null

           
          },


           })
],

} satisfies NextAuthConfig