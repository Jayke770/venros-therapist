import { Elysia, t } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { config } from "@/config";
import { ISession } from "@/types";
import { UserData } from "@/models/collections";
import { storage } from "@/lib/storage";
const router = new Elysia({ prefix: "/api/auth" })
    .use(jwt({
        name: "jwt",
        secret: config.JWT_SECRET,
        exp: "30d",
        schema: t.Object({
            id: t.String(),
            name: t.String(),
            address: t.String(),
            dob: t.Date(),
            email: t.String(),
            gender: t.String(),
            userType: t.Union([t.Literal("user"), t.Literal("admin"), t.Literal("therapist")]),
        })
    }))

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
        auth.set({
            value: await jwt.sign({
                id: user._id.toString(),
                name: user.name,
                address: user.address,
                dob: user.dob,
                email: user.email,
                gender: user.gender,
                userType: user.userType
            }),
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
router.post("/signup", async ({ body, jwt, cookie: { auth } }) => {
    try {
        const signUpData = body
        if (signUpData.password !== signUpData.confirmPassword) return { status: false, message: "Password not match" }
        const emailAlreadytaken = await UserData.findOne({ email: { $eq: signUpData.email.trim().toLowerCase() } })
        if (emailAlreadytaken) return { status: false, message: "Email is already taken" }
        const encryptedPassword = await Bun.password.hash(signUpData.password, "bcrypt")
        const newUser = await UserData.create(signUpData.type === "therapist" ? {
            address: signUpData.address,
            dob: signUpData.dob,
            email: signUpData.email.trim().toLowerCase(),
            gender: signUpData.gender,
            languages: JSON.parse(signUpData.languages),
            name: signUpData.fullName,
            password: encryptedPassword,
            pNumber: signUpData.pNumber,
            userType: signUpData.type,
            files: {},
            educationQualification: signUpData.educationQualification,
            positionApplying: signUpData.positionApplying,
            yrsOfExp: signUpData.yrsOfExp
        } : {
            email: signUpData.email.trim().toLowerCase(),
            gender: signUpData.gender,
            name: signUpData.fullName,
            password: encryptedPassword,
            userType: signUpData.type,
        })
        if (signUpData.type === "therapist") {
            let signUpFiles: { [key: string]: string } = {}
            const filesMap = ["mphilOrPhd", "rciLicense", "degreeOrMarksheet", "workExpLetter", "workExpLetter"]
            for (const key of filesMap) {
                const file = await storage.uploadFile((signUpData as any)[key])
                if (file?.status) signUpFiles[key] = file.fileId
            }
            newUser.files = signUpFiles
            await newUser.save()
        }
        auth.set({
            value: await jwt.sign({
                id: newUser._id.toString(),
                name: newUser.name,
                address: newUser.address,
                dob: newUser.dob,
                email: newUser.email,
                gender: newUser.gender,
                userType: newUser.userType
            }),
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            sameSite: "lax"
        })
        return { status: true, message: "Account Successfully Created" }
    } catch (e) {
        return { status: false, message: "Failed to create account" }
    }
}, {
    tags: ["Authentication"],
    body: t.Union([
        t.Object({
            type: t.Literal("therapist"),
            fullName: t.String({ minLength: 5 }),
            dob: t.Date(),
            pNumber: t.String({ minLength: 10 }),
            address: t.String({ minLength: 10 }),
            gender: t.Union([t.Literal("male"), t.Literal("female"), t.Literal("undisclosed")]),
            languages: t.String(),
            positionApplying: t.String(),
            educationQualification: t.String(),
            yrsOfExp: t.String(),
            mphilOrPhd: t.Optional(t.File()),
            rciLicense: t.Optional(t.File()),
            degreeOrMarksheet: t.Optional(t.File()),
            workExpLetter: t.Optional(t.File()),
            otherCertifications: t.Optional(t.File()),
            email: t.String(),
            password: t.String({ minLength: 8 }),
            confirmPassword: t.String({ minLength: 8 })
        }),
        t.Object({
            type: t.Literal("user"),
            fullName: t.String({ minLength: 5 }),
            pNumber: t.String({ minLength: 10 }),
            gender: t.Union([t.Literal("male"), t.Literal("female"), t.Literal("undisclosed")]),
            email: t.String(),
            password: t.String({ minLength: 8 }),
            confirmPassword: t.String({ minLength: 8 }),
        })
    ]),
    response: {
        "200": t.Object({
            status: t.Boolean(),
            message: t.String()
        }),
    },

})
router.get("/user", async ({ jwt, cookie: { auth } }) => {
    try {
        const token = auth.value
        const session = await jwt.verify(token)
        if (!session) return { status: false, message: "Invalid JWT" }
        const userData = await UserData.findOne({ _id: { $eq: session.id } }, {
            address: 1,
            dob: 1,
            email: 1,
            gender: 1,
            userType: 1,
            name: 1
        })
        if (!userData) return { status: false, message: "Invalid User" }
        return {
            status: true,
            id: userData._id.toString(),
            address: userData.address,
            dob: userData.dob,
            email: userData.email,
            gender: userData.gender,
            name: userData.name,
            userType: userData.userType
        }
    } catch (e) {
        return { status: false, message: "error" }
    }
}, {
    tags: ["Authentication"],
    detail: { security: [{ JWTAuth: [] }] },
    response: {
        "200": t.Object(
            {
                status: t.Boolean(),
                message: t.Optional(t.String()),
                id: t.Optional(t.String()),
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
router.get("/logout", async ({ jwt, cookie, redirect }) => {
    cookie.auth.remove()
    return redirect(config.FRONTEND_DOMAIN)
}, {
    tags: ["Authentication"]
})
export default router