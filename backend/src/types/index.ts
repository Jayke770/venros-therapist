export interface ILanguages {
    name: string,
    code: string
}

export interface IUserDataModel {
    userType: "user" | "therapist" | "admin"
    name: string
    dob: Date,
    address: string,
    email: string,
    password: string,
    gender: string,
    pNumber: string,
    languages: ILanguages[],
    files: { [key: string]: string },
    positionApplying: string,
    educationQualification: string,
    yrsOfExp: number,
    therapistAccountStatus: "pending" | "activated" | null
}
export interface ISession {
    id: string,
    name: string
    userType: "user" | "therapist" | "admin"
    dob: Date,
    address: string,
    email: string,
    gender: string,
}