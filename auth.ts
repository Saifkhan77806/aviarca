import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    pages:{
        signIn: "/login",
        error: "/error"
    },
    callbacks:{
        async signIn({user, account}){
                if(account?.provider == "credentials"){
                    const existingUser = await getUserById(user.id as string)

                    if(!existingUser) return false

                    return true
                }

                return false
        },
        async session({token, session} : any){
            session.user.id = token.id;
            session.user.email = token.email
            session.user.role = token.role
            session.user.phone = token.phone
            session.user.address = token.address
            session.user.name = token.name
            session.user.salary = token.salary + 100

            return session
        },
        async jwt({token, user}){

            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token

            if(user){

                token.role = existingUser.position
                token.email = existingUser.email
                token.phone = existingUser.phone
                token.name = existingUser.name
                token.address = existingUser.address
                token.salary = existingUser.salary

            }    


            return token
        }
    },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig
})