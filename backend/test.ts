import { faker } from '@faker-js/faker'
(async () => {
    for (let index = 0; index < 100; index++) {
        let formData = new FormData()
        formData.append("type", "therapist")
        formData.append("fullName", faker.person.fullName())
        formData.append("dob", `${faker.date.past({ years: 10 })}`)
        formData.append("pNumber", faker.phone.number())
        formData.append("address", faker.location.streetAddress())
        formData.append("gender", ["male", "female"][Math.floor(Math.random() * 2)])
        formData.append("email", `${faker.person.fullName().trim().toLowerCase()}@test.com`)
        formData.append("password", "12345678")
        formData.append("confirmPassword", "12345678")
        formData.append("languages", JSON.stringify([{ "name": "Afrikaans", "code": "af" }]))
        formData.append("positionApplying", ["clinical psychologist", "counsellor", "specialized"][Math.floor(Math.random() * 3)])
        formData.append("educationQualification", "rawhrghfafgs")
        formData.append("yrsOfExp", `${faker.number.int({ min: 2, max: 10 })}`)
        const h = await fetch("http://localhost:3000/api/auth/signup", {
            method: "post",
            body: formData
        })
        console.log(await h.json())
    }
})()