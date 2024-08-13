import authConfig from "@/lib/nextAuth/auth.config"
import NextAuth from "next-auth"
import { NextRequest } from "next/server"
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {

})