import { Elysia, t } from "elysia";
import { config } from "@/config";
import { UserData } from "@/models/collections";
import { authHandler } from "@/lib/auth";
import { mongo } from 'mongoose'
import { utapi } from "@/lib/storage";
const router = new Elysia({ prefix: "/api/users" })


router.get("", async ({ query, cookie }) => {
    try {
        const token = cookie.auth.value ?? ""
        const session = await authHandler.verifyJWT(token)
        if (!session) return { status: false, message: "Invalid JWT" }
        const data = await UserData.findOne({
            _id: { $eq: new mongo.ObjectId(query.id) }
        }, {
            password: 0,
            positionApplying: 0,
            educationQualification: 0,
            __v: 0,
            therapistAccountStatus: 0
        })
        if (!data) return { status: false }
        return {
            status: true,
            data: { ...data?.toJSON(), id: data.id }
        }
    } catch (e) {
        return { status: false, message: "Failed to fetch user data" }
    }
}, {
    tags: ["Users"],
    detail: { security: [{ JWTAuth: [] }] },
    query: t.Object({
        id: t.String()
    }),
    response: {
        "200": t.Object({
            status: t.Boolean({ default: false }),
            message: t.Optional(t.String()),
            data: t.Optional(t.Object({
                address: t.Optional(t.String()),
                dob: t.Optional(t.Date()),
                email: t.String(),
                gender: t.Union([t.Literal("male"), t.Literal("female"), t.Literal("undisclosed")]),
                userType: t.Union([t.Literal("therapist"), t.Literal("admin"), t.Literal("user")]),
                languages: t.Array(t.Object({ name: t.String(), code: t.String() })),
                name: t.String(),
                createdAt: t.Date(),
                updatedAt: t.Date(),
                id: t.String(),
                bio: t.Nullable(t.String()),
                coverPhoto: t.Nullable(t.String()),
                profilePhoto: t.Nullable(t.String()),
            }))
        })
    }
})

router.get("/therapist", async ({ query, cookie }) => {
    try {
        const token = cookie.auth.value ?? ""
        const session = await authHandler.verifyJWT(token)
        if (!session) return { status: false, message: "Invalid JWT" }
        const therapist = await UserData.aggregate([
            {
                $match: {
                    _id: { $ne: new mongo.ObjectId(session.id) },
                    userType: { $eq: "therapist" },
                    therapistAccountStatus: { $eq: "activated" }
                }
            },
            { $skip: query.skip },
            { $limit: query.limit },
            {
                $addFields: {
                    id: {
                        $toString: "$_id"
                    }
                }
            },
            {
                $project: {
                    password: 0,
                    positionApplying: 0,
                    educationQualification: 0,
                    userType: 0,
                    _id: 0,
                    __v: 0
                }
            }
        ])
        return { status: true, data: therapist }
    } catch (e) {
        console.log(e)
        return { status: false, message: "Failed to fetch therapist" }
    }
}, {
    tags: ["Users"],
    detail: { security: [{ JWTAuth: [] }] },
    query: t.Object({
        skip: t.Number({ default: 0 }),
        limit: t.Number({ default: 20 })
    }),
    response: {
        "200": t.Object({
            status: t.Boolean({ default: false }),
            message: t.Optional(t.String()),
            data: t.Optional(t.Array(t.Object({
                id: t.Any(),
                yrsOfExp: t.Optional(t.Number()),
                address: t.String(),
                dob: t.Date(),
                pNumber: t.Optional(t.String()),
                email: t.String(),
                gender: t.Union([t.Literal("male"), t.Literal("female"), t.Literal("undisclosed")]),
                languages: t.Array(t.Object({ name: t.String(), code: t.String() })),
                name: t.String(),
                createdAt: t.Date(),
                updatedAt: t.Date(),
            })))
        })
    }
})

router.post("/editprofile", async ({ body, cookie }) => {
    try {
        const token = cookie.auth.value ?? ""
        const session = await authHandler.verifyJWT(token)
        if (!session) return { status: false, message: "Invalid JWT" }
        const data = body
        const userData = await UserData.findOne({ _id: { $eq: new mongo.ObjectId(session.id) } })
        if (!userData) return { status: false, message: "Invalid user" }
        if (data?.bio) userData.bio = data.bio
        if (data?.coverPhoto) {
            const file = await utapi.uploadFiles(data.coverPhoto)
            console.log(file)
            if (file) userData.coverPhoto = file.data?.key
        }
        if (data?.profilePicture) {
            const file = await utapi.uploadFiles(data.profilePicture)
            console.log(file)
            if (file) userData.profilePhoto = file.data?.key
        }
        await userData.save()
        return { status: true, message: "Profile Successfully Updated" }
    } catch (e) {
        return { status: false }
    }
}, {
    tags: ["Users"],
    detail: { security: [{ JWTAuth: [] }] },
    body: t.Object({
        bio: t.Optional(t.String()),
        coverPhoto: t.Optional(t.File()),
        profilePicture: t.Optional(t.File())
    }),
    response: {
        "200": t.Object({
            status: t.Boolean(),
            message: t.Optional(t.String()),
        })
    }
})

export default router
