
import type { IUserDataModel } from "@/types";
import { Schema, model, models, deleteModel } from "mongoose";
const UserDataSchema = new Schema<IUserDataModel>(
    {
        address: { type: String },
        dob: { type: Date },
        email: { type: String, required: true, unique: true },
        gender: { type: String, required: true },
        languages: [],
        name: { type: String, required: true },
        password: { type: String, required: true },
        userType: { type: String, enum: ["user", "therapist", "admin"], default: 'user' },
        therapistAccountStatus: { type: String, default: null },
        files: {},
        educationQualification: { type: String, default: null },
        positionApplying: { type: String, default: null },
        yrsOfExp: { type: Number, default: 0 },
        bio: { type: String, default: null },
        pNumber: { type: String },

    },
    {
        timestamps: true
    }
)
export const UserData = model("users", UserDataSchema);
