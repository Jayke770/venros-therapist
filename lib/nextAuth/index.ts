import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import dbClient from "@/lib/nextAuth/db"
import authConfig from "@/lib/nextAuth/auth.config"
export const { handlers, signIn, signOut, auth } = NextAuth({
    //@ts-ignore
    adapter: MongoDBAdapter(dbClient),
    ...authConfig,
    providers: [
        Credentials({
            credentials: {},
            async authorize(credentials, req) {
                try {
                    return null
                } catch (e) {
                    return null
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 15 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env?.AUTH_SECRET
}) 