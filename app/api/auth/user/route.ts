import { NextRequest, NextResponse } from "next/server";
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { z } from 'zod'
import { dayJs } from '@/lib/utils'
import dbConnect from '@/models/dbConnect'
import { UserData } from '@/models/collections'
import bcrypt from 'bcryptjs'
const signUpSchema = z.union([
    z.object({
        type: z.literal("therapist"),
        fullName: z.string().min(5, { message: "Invalid Full Name." }),
        dob: z.string({
            required_error: "A date of birth is required.",
        }),
        pNumber: z.string().min(9, { message: "Invalid Phone Number." }),
        address: z.string().min(5, { message: "Invalid Address." }),
        gender: z.union([z.literal("male"), z.literal("female"), z.literal("undisclosed")], { required_error: "Gender is required" }),
        languages: z.string(),
        positionApplying: z.union([z.literal("counsellor"), z.literal("clinical psychologist"), z.literal("specialized therapist")], { required_error: "Position Applying is required" }),
        educationQualification: z.string().min(10, { message: "Education Qualification is required." }),
        yrsOfExp: z.string().min(1, { message: "Years of Experience  is required." }),
        mphilOrPhd: z.custom<File>().optional(),
        rciLicense: z.custom<File>().optional(),
        degreeOrMarksheet: z.custom<File>().optional(),
        workExpLetter: z.custom<File>().optional(),
        otherCertifications: z.custom<File>().optional(),
        email: z.string().email({ message: 'Email is invalid' }),
        password: z.string().min(8, { message: "Password must be more than 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Password must be more than 8 characters" })
    }),
    z.object({
        type: z.literal("user"),
        fullName: z.string().min(5, { message: "Invalid Full Name." }),
        pNumber: z.string().min(9, { message: "Invalid Phone Number." }),
        gender: z.union([z.literal("male"), z.literal("female"), z.literal("undisclosed")], { required_error: "Gender is required" }),
        email: z.string().email({ message: 'Email is invalid' }),
        password: z.string().min(8, { message: "Password must be more than 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Password must be more than 8 characters" })
    })
])
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = signUpSchema.safeParse(Object.fromEntries((await req.formData()).entries()))
        if (!formData.success) return NextResponse.json({ status: false, message: "Failed to validate data" })
        await dbConnect()
        const signUpdata = formData.data
        if (signUpdata.password !== signUpdata.confirmPassword) return NextResponse.json({ status: false, message: "Password not match" })
        const userData = await UserData.findOne({ email: { $eq: signUpdata.email.trim().toLowerCase() } })
        if (userData) return NextResponse.json({ status: false, message: "Email is already taken" })
        const encryptedPassword = await bcrypt.hash(signUpdata.password, 10)
        const newUser = new UserData(signUpdata?.type === "therapist" ? {
            address: signUpdata.address,
            dob: dayJs(signUpdata.dob),
            email: signUpdata.email.trim().toLowerCase(),
            gender: signUpdata.gender,
            languages: JSON.parse(signUpdata.languages),
            name: signUpdata.fullName,
            password: encryptedPassword,
            userType: signUpdata.type
        } : {
            email: signUpdata.email.trim().toLowerCase(),
            gender: signUpdata.gender,
            name: signUpdata.fullName,
            password: encryptedPassword,
            userType: signUpdata.type,
        })
        await newUser.save()
        return NextResponse.json({ status: true, message: "Account Successfully Created" })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: false, message: ReasonPhrases.INTERNAL_SERVER_ERROR }, { status: StatusCodes.INTERNAL_SERVER_ERROR, statusText: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
} 