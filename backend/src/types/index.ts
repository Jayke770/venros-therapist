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
    languages: ILanguages[]
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