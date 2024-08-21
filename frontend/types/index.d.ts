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