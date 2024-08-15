import Credentials from "@auth/express/providers/credentials"
import type { ExpressAuthConfig } from "@auth/express"

export const AuthConfig: ExpressAuthConfig = {
    trustHost: true,
    providers: [Credentials({
        credentials: {
            username: {},
            password: {}
        },
        async authorize(credentials, request) {
            return null
        },
    })]
} 