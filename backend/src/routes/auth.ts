import { Elysia, t } from "elysia";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { jwt } from '@elysiajs/jwt'
import { config } from "@/config";
import { ISession } from "@/types";
import { UserData } from "@/models/collections";
const router = new Elysia({ prefix: "/api/auth" })
    .use(jwt({ name: "jwt", secret: config.JWT_SECRET, exp: "30d" }))

router.post("/signin", async ({ jwt, body, cookie: { auth } }) => {
    try {
        const user = await UserData.findOne({ email: { $eq: body?.email } }, {
            email: 1,
            password: 1,
            name: 1,
            address: 1,
            dob: 1,
            gender: 1,
            userType: 1
        })
        if (!user) return { status: false, message: "Invalid Email" }
        const isValidPassword = await Bun.password.verify(body.password, user.password, "bcrypt")
        if (!isValidPassword) return { status: false, message: "Invalid Password" }
        const session: ISession = {
            id: user._id.toString(),
            name: user.name,
            address: user.address,
            dob: user.dob,
            email: user.email,
            gender: user.gender,
            userType: user.userType
        }
        auth.set({
            value: await jwt.sign(session as any),
            httpOnly: true,
            sameSite: "lax"
        })
        return { status: true, message: "Successfully logged In" }
    } catch (e) {
        return { status: false, message: "Failed to login" }
    }
}, {
    tags: ["Authentication"],
    type: "application/json",
    body: t.Object({
        email: t.String({ minLength: 1 }),
        password: t.String({ minLength: 8 })
    }),
    response: {
        "200": t.Object(
            {
                status: t.Boolean(),
                message: t.String()
            }
        ),
    },
})
router.get("/user", async ({ jwt, cookie: { auth } }) => {
    try {
        const session: ISession | undefined | null = await jwt.verify(auth.value) as any
        if (!session) return { status: false }
        const userData = await UserData.findOne({ _id: { $eq: session.id } }, {
            address: 1,
            dob: 1,
            email: 1,
            gender: 1,
            userType: 1,
            name: 1
        })
        if (!userData) return { status: false }
        return {
            status: true,
            ...userData
        }
    } catch (e) {
        return { status: false }
    }
}, {
    tags: ["Authentication"],
    detail: { security: [{ JWTAuth: [] }] },
    response: {
        "200": t.Object(
            {
                status: t.Boolean(),
                userType: t.Optional(t.Union([t.Literal("user"), t.Literal("admin"), t.Literal("therapist")])),
                name: t.Optional(t.String()),
                dob: t.Optional(t.Date()),
                address: t.Optional(t.String()),
                email: t.Optional(t.String()),
                gender: t.Optional(t.String()),
            }
        ),
    },
})
export default router