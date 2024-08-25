import type { IAuthSession, IAuthenticate } from '@/types'
class Handler {
    private readonly HOST = new URL(process?.env?.NEXT_PUBLIC_APP_HOST ?? "").toString()
    async getSession(cookie: { name?: string, value?: string }): Promise<IAuthSession | undefined> {
        try {
            console.log("ccc", cookie)
            const req = await fetch(`${this.HOST}api/auth/user`, {
                headers: {
                    apiKey: `${cookie?.value}`,
                    cookie: `${cookie?.name}=${cookie?.value};`
                }
            })
            console.log(req.statusText)
            if (!req.ok) return undefined
            const res: IAuthSession = await req.json()
            console.log(res)
            if (!res?.status) return res
            return res
        } catch (e) {
            console.log("err", e)
            return undefined
        }
    }
    async signIn(data: { [key: string]: any }): Promise<IAuthenticate> {
        try {
            const req = await fetch(`${this.HOST}api/auth/signin`, {
                method: "post",
                body: JSON.stringify(data)
            })
            if (!req.ok) return { status: false }
            const res: IAuthenticate = await req.json()
            if (!res?.status) return res
            return res
        } catch (e) {
            return { status: false }
        }
    }
    async signUp(data: FormData): Promise<IAuthenticate> {
        try {
            const req = await fetch(`${this.HOST}api/auth/signup`, {
                method: "post",
                body: data
            })
            if (!req.ok) return { status: false }
            const res: IAuthenticate = await req.json()
            if (!res?.status) return res
            return res
        } catch (e) {
            return { status: false }
        }
    }
}
export const authHandler = new Handler()