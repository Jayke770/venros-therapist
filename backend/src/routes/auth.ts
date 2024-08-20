import { Elysia, t } from "elysia";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { jwt } from '@elysiajs/jwt'
import { config } from "@/config";
import { ISession } from "@/types";
import { UserData } from "@/models/collections";
import * as Minio from 'minio'
import { nanoid } from 'nanoid'
import mime from 'mime';
const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: '151ncpMJEwIpIOOWVY1O',
    secretKey: '23hcxQPR7hThEkJKmdcaq5YmD7ClbQ5cCIddB0uo'
})
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
            userType: signUpData.type,
        } : {
            email: signUpData.email.trim().toLowerCase(),
            gender: signUpData.gender,
            name: signUpData.fullName,
            password: encryptedPassword,
            userType: signUpData.type,
        })
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
router.post("/test", async ({ body }) => {
    try {
        const arrbuf = await body.file.arrayBuffer();
        const buffer = Buffer.from(arrbuf);
        const hhhh = await minioClient.presignedUrl("GET", "test", "Screenshot 2024-08-13 at 10.06.53 PM.png", 24 * 60 * 60)
        // const objectName = `${nanoid(20)}.${mime.getExtension(body.file.type)}`
        // const hhh = await minioClient.putObject("test", objectName, buffer)
        console.log(hhhh)
    } catch (e) {
        console.log(e)
    }
}, {
    type: "multipart/form-data",
    body: t.Object({
        file: t.File()
    })
})
export default router