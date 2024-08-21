import { Elysia, t } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { config } from "@/config";
import { UserData } from "@/models/collections";
const router = new Elysia({ prefix: "/api/therapist" })
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

router.get("", async ({ query }) => {
    try {
        const therapist = await UserData.aggregate([
            { $match: { userType: { $eq: "therapist" } } },
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
export default router
