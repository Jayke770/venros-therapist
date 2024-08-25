import { config } from "@/config";
import { ISession } from "@/types";
import { SignJWT, jwtVerify } from "jose";
class Auth {
    private readonly SECRET_KEY = new TextEncoder().encode(config.JWT_SECRET);
    async signJWT(payload: any): Promise<string> {
        const expire = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime(expire)
            .sign(this.SECRET_KEY)
        return jwt
    }
    async verifyJWT(token: string): Promise<ISession | false> {
        try {
            const session = (await jwtVerify<ISession>(token, this.SECRET_KEY)).payload
            return session
        } catch (_) {
            return false
        }
    }
}
export const authHandler = new Auth()