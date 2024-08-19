import { auth } from "@/lib/auth"
import SignUpForm from "./signupForm"
import { redirect } from "next/navigation"
export default async function SignUp() {
    const sessionData = await auth()
    if (sessionData) redirect("/dashboard")
    return (
        <SignUpForm />
    )
}