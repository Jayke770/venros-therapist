import NavBar from "../navBar"
import Therapist from './therapist'
import { cookies } from 'next/headers'
import { authHandler } from "@/lib/auth"
export default async function UserDashboard() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    const session = await authHandler.getSession({ name: authCookie?.name, value: authCookie?.value })
    return (
        <>
            <NavBar session={session} />
            <Therapist />
        </>
    )
}