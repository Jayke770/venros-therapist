import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/models/dbConnect"
import { UserData } from '@/models/collections'
import bcrypt from 'bcrypt'
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
                    return { name: "ss", email: "fasfsa", id: "fasfafsafsf", image: "fashfsafjshafjsaf" }
                } catch (e) {
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: "/get-started"
    }
})