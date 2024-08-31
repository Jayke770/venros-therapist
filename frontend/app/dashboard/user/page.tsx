import NavBar from "../navBar"
import TherapistProfile from './therapistProfile'
import { cookies } from 'next/headers'
import { authHandler } from "@/lib/auth"
import { redirect } from "next/navigation"
export default async function UserDashboard(props: {
    params: { [key: string]: string | boolean | number | null | undefined },
    searchParams: { id?: string }
}) {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    const session = await authHandler.getSession({ name: authCookie?.name, value: authCookie?.value })
    if (!session) redirect("/get-started")
    return (
        <>
            <NavBar session={session} />
            {session?.userType === "therapist" && <TherapistProfile session={session} userId={props.searchParams.id} isOwner={session.id === props?.searchParams?.id} />}
        </>
    )
}