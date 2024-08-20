export interface ILanguages {
    name: string,
    code: string
}

export interface IUserDataModel {
    userType: "user" | "therapist" | "admin"
    name: string
    name: string,
    dob: Date,
    address: string,
    email: string,
    password: string,
    gender: string,
    languages: ILanguages[]
}