import type { IAuthSession, IAuthenticate, IUserData } from '@/types'
class Handler {
    private readonly HOST = process?.env?.NEXT_PUBLIC_APP_HOST
    async getSession(cookie: { name?: string, value?: string }): Promise<IAuthSession | undefined> {
        try {
            const req = await fetch(new URL(`${this.HOST}/api/auth/user`), {
                headers: {
                    cookie: `${cookie?.name}=${cookie?.value};`
                }
            })
            if (!req.ok) return undefined
            const res: IAuthSession = await req.json()
            if (!res?.status) return res
            return res
        } catch (e) {
            return undefined
        }
    }
    async signIn(data: { [key: string]: any }): Promise<IAuthenticate> {
        try {
            const req = await fetch(new URL(`${this.HOST}/api/auth/signin`), {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
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
            const req = await fetch(new URL(`${this.HOST}/api/auth/signup`), {
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
    async getUser(id?: string, cookie?: { name?: string, value?: string }): Promise<{ status: boolean, data?: IUserData }> {
        try {
            const req = await fetch(new URL(`${this.HOST}/api/user?id=${id}`), {
                headers: {
                    cookie: `${cookie?.name}=${cookie?.value};`
                }
            })
            console.log("fsafsfasfasf", req.statusText)
            if (!req.ok) return { status: false }
            const res: { status: boolean, data: IUserData } = await req.json()
            console.log("data", res)
            if (!res?.status) return res
            return res
        } catch (e) {
            return { status: false }
        }
    }
}
export const authHandler = new Handler()