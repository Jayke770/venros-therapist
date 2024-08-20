interface IAuthSession {
    userType: "user" | "therapist" | "admin"
    name: string
    dob: Date,
    address: string,
    email: string,
    gender: string,
    status: true
}
interface IAuthSignIn {
    status: boolean,
    message?: string
}
class Handler {
    private readonly HOST = new URL(process?.env?.NEXT_PUBLIC_APP_HOST ?? "").toString()
    async getSession(cookie: { name: string, value: string }): Promise<IAuthSession | { status: false }> {
        try {
            const req = await fetch(`${this.HOST}api/auth/user`, {
                headers: {
                    cookie: `${cookie?.name} = ${cookie?.value};`
                }
            })
            if (!req.ok) return { status: false }
            const res: IAuthSession = await req.json()
            if (!res?.status) return res
            return res
        } catch (e) {
            return { status: false }
        }
    }
    async signIn(data: { [key: string]: any }): Promise<IAuthSignIn> {
        try {
            const req = await fetch(`${this.HOST}api/auth/signin`, {
                method: "post",
                body: JSON.stringify(data)
        })
            if (!req.ok) return { status: false }
            const res: IAuthSignIn = await req.json()
            if (!res?.status) return res
            return res
        } catch (e) {
            return { status: false }
        }
    }
}
const authHandler = new Handler()
export default authHandler