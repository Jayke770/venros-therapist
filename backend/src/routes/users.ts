import { Elysia, t } from "elysia";
import { config } from "@/config";
import { UserData } from "@/models/collections";
import { authHandler } from "@/lib/auth";
import { mongo } from 'mongoose'
const router = new Elysia({ prefix: "/api/users" })

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
            { $addFields: { id: "$_id" } },
            { $project: { password: 0, positionApplying: 0, educationQualification: 0, userType: 0, _id: 0, __v: 0 } }
        ])
        return { status: true, data: therapist }
    } catch (e) {
        return { status: false, message: "Failed to fetch therapist" }
    }
}, {
    tags: ["Therapist"],
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

router.get("", async ({ query, cookie }) => {
    try {
        const token = cookie.auth.value ?? ""
        const session = await authHandler.verifyJWT(token)
        if (!session) return { status: false, message: "Invalid JWT" }
        const [data] = await UserData.aggregate([
            {
                $match: {
                    _id: { $eq: new mongo.ObjectId(query.id) }
                }
            },
            { $addFields: { id: "$_id" } },
            {
                $project: {
                    password: 0,
                    positionApplying: 0,
                    educationQualification: 0,
                    userType: 0,
                    _id: 0,
                    __v: 0,
                    therapistAccountStatus: 0, 
                    
                }
            }
        ])
        return { status: true, data }
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
                address: t.String(),
                dob: t.Date(),
                email: t.String(),
                gender: t.Union([t.Literal("male"), t.Literal("female"), t.Literal("undisclosed")]),
                languages: t.Array(t.Object({ name: t.String(), code: t.String() })),
                name: t.String(),
                createdAt: t.Date(),
                updatedAt: t.Date(),
                id: t.Any(),
                bio: t.Optional(t.String())
            }))
        })
    }
})
export default router
