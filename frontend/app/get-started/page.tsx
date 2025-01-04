import LoginForm from './loginForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { authHandler } from '@/lib/auth'
export default async function GetStarted() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    if (authCookie) {
        const session = await authHandler.getSession({ name: authCookie?.name, value: authCookie?.value })
        if (session?.userType === "therapist") redirect(`/dashboard/user/therapist/?id=${session.id}`)
        if (session?.status) redirect("/dashboard")
    }
    return (
        <main className="h-[100dvh] w-[100dvw] flex justify-center items-center p-5">
            <LoginForm />
        </main>
    )
}