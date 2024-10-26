import { z } from 'zod'
export interface ILanguages {
    name: string,
    code: string
}
export interface IAuthSession {
    id: string
    userType: "user" | "therapist" | "admin"
    name: string
    dob: Date,
    address: string,
    email: string,
    gender: string,
    status: true
}
export interface IAuthenticate {
    status: boolean,
    message?: string
}
export interface ITherapist {
    id: string
    yrsOfExp: number
    name: string
    address: string
    dob: Date
    email: string
    gender: "male" | "female" | "undisclosed"
    languages: ILanguages[]
    createdAt: Date
    updatedAt: Date
}
export const UserData = z.object({
    address: z.string().optional(),
    dob: z.date().optional(),
    email: z.string(),
    gender: z.union([z.literal("male"), z.literal("female"), z.literal("undisclosed")]),
    userType: z.union([z.literal("therapist"), z.literal("admin"), z.literal("user")]),
    languages: z.array(z.object({ name: z.string(), code: z.string() })),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    id: z.string(),
    bio: z.string().optional(),
    coverPhoto: z.string().optional(),
    profilePhoto: z.string().optional()
})
export type IUserData = z.infer<typeof UserData>