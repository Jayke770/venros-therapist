import SignUpForm from "./signupForm"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import authHandler from '@/lib/auth'
export default async function SignUp() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    if (authCookie) {
        const session = await authHandler.getSession({ name: authCookie?.name, value: authCookie?.value })
        if (session?.status) redirect("/dashboard")
    }
    return (
        <SignUpForm />
    )
}