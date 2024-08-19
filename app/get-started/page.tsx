import LoginForm from './loginForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
export default async function GetStarted() {
    const sessionData = await auth()
    if (sessionData) redirect("/dashboard")
    return (
        <main className="h-[100dvh] w-[100dvw] flex justify-center items-center p-5">
            <LoginForm />
        </main>
    )
}