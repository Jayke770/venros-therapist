import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
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
                return { name: "ffs", email: "fasfsa", id: "fasfafsafsf", image: "fashfsafjshafjsaf" }
            },
        })
    ],
    pages: {
        signIn: "/get-started"
    }
})