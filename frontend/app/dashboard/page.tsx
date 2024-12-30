import { cookies } from 'next/headers'
import { authHandler } from "@/lib/auth"
import NavBar from "../../components/ui/navBar"
import Dashboard from './main'
import { redirect } from 'next/navigation'
export default async function DashboardPage() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    const session = await authHandler.getSession({ name: authCookie?.name, value: authCookie?.value })
    if (!session) redirect("/get-started")
    if (session.userType === "therapist") redirect(`/dashboard/user?id=${session.id}`)
    return (
        <>
            <NavBar session={session} />
            <Dashboard session={session} />
        </>
    )
}

