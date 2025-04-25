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
            console.log("session", session, "token", token)
            session.user.id = token.id;
            return session
        },
        async jwt({token, user}){
            console.log("Jwt token", token)
            if (user) {
                token.id = user.id;
              }
            return token
        }
    },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig
})