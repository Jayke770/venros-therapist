import { getSession } from "@auth/express"
import { AuthConfig } from "../config/auth"
import type { NextFunction, Request, Response } from "express"

export async function authenticatedUser(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const session =
        res.locals.session ?? (await getSession(req, AuthConfig)) ?? undefined

    res.locals.session = session

    if (session) {
        return next()
    }

    return res.status(401).json({ message: "Not Authenticated" })
}

export async function currentSession(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const session = (await getSession(req, AuthConfig)) ?? undefined
    res.locals.session = session
    return next()
}