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