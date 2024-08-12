import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { faker } from '@faker-js/faker'
export default async function User(props: any) {
    return (
        <main className=" px-4 lg:px-24 py-3 ">
            <div className="relative bg-primary rounded-2xl h-80 min-w-[250px] w-full">
                <div className=" absolute lg:left-5 -bottom-44 lg:-bottom-16 lg:right-5 w-full flex justify-between gap-3 lg:gap-0 flex-col lg:flex-row lg:w-auto transition-all">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex justify-center items-center">
                            <Avatar className="w-40 h-40 border-1 border-white shadow-lg">
                                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} alt="Therapist" className=" object-cover" />
                                <AvatarFallback>JK</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col justify-end items-center lg:items-start px-4 h-full">
                            <h1 className="text-2xl font-bold text-center">Dr. {faker.person.fullName()}</h1>
                            <p className="text-muted-foreground text-center">Clinical Psychologist</p>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center items-end">
                        <Button>Book Now</Button>
                        <Button>Message</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}