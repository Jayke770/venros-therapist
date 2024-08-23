import { cookies } from 'next/headers'
import { authHandler } from "@/lib/auth"
import NavBar from "./navBar"
import Dashboard from './main'
import { redirect } from 'next/navigation'
export default async function DashboardPage() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    const session = await authHandler.getSession({ name: authCookie?.name, value: authCookie?.value })
    console.log("fafasa", session)
    if (!session) redirect("/get-started")
    return (
        <>
            <NavBar session={session} />
            <Dashboard session={session} />
        </>
    )
}

