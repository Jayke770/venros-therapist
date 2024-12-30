import NavBar from "@/components/ui/navBar"
import TherapistProfile from './profile'
import ViewTherapistProfile from "./viewTherapist"
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
        title: "Therapist Profile"
    }
}
export default async function Profile(props: {
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
    if (userData.data?.userType === "user") redirect(`/dashboard/user?id=${props.searchParams.id}`)
    return (
        <>
            <NavBar session={session} />
            {session.id === props?.searchParams?.id ? (
                <TherapistProfile session={session} userId={props.searchParams.id} />
            ) : (
                <ViewTherapistProfile session={session} userId={props.searchParams.id} />
            )}
        </>
    )
}