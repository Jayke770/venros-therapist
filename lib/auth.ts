import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/models/dbConnect"
import { UserData } from '@/models/collections'
import bcrypt from 'bcryptjs'
export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    secret: process.env?.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                try {
                    await dbConnect()
                    const userData = await UserData.findOne({ email: { $eq: credentials.email } })
                    if (!userData) return null
                    const isValidPassword = await bcrypt.compare(credentials.password as string, userData.password)
                    if (!isValidPassword) return null
                    return { name: userData.name, email: userData.email, id: userData._id.toString(), image: null }
                } catch (e) {
                    console.log(e)
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: "/get-started"
    }
})