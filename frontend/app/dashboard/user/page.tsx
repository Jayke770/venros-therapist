import NavBar from "@/components/ui/navBar"
import ViewUserProfile from "./viewProfile"
import UserProfile from "./profile"
import { cookies } from 'next/headers'
import { authHandler } from "@/lib/auth"
import { redirect } from "next/navigation"
import type { Metadata, ResolvingMetadata } from 'next'
type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "User Profile"
    }
}
export default async function UserDashboard(props: {
    params: { [key: string]: string | boolean | number | null | undefined },
    searchParams: { id?: string }
}) {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('auth')
    const [session, userData] = await Promise.all([
        authHandler.getSession({ name: authCookie?.name, value: authCookie?.value }),
        authHandler.getUser(props.searchParams.id, { name: authCookie?.name, value: authCookie?.value })
    ])
    if (!session) redirect("/get-started")
    if (userData.data?.userType === "therapist") redirect(`/dashboard/user/therapist?id=${props.searchParams.id}`)
    return (
        <>
            <NavBar session={session} />
            {session.id === props?.searchParams?.id ? (
                <UserProfile session={session} />
            ) : (
                <ViewUserProfile session={session} userId={props.searchParams.id} />
            )}
        </>
    )
}