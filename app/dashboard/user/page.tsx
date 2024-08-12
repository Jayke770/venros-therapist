import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { faker } from '@faker-js/faker'
import { CalendarCheck, MessageCircle } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn, utils } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
export default async function User(props: any) {
    return (
        <main className=" px-4 lg:px-24 py-3 ">
            <div className="relative bg-primary rounded-2xl h-72  lg:h-80 min-w-[250px] w-full">
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
                        <Button variant={"outline"}>
                            <CalendarCheck className="mr-2 h-4 w-4" />
                            Book Now
                        </Button>
                        <Button variant={"outline"}>
                            <MessageCircle className="mr-2 h-4 w-4" />Message
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-56 w-full lg:mt-24">
                <div className="flex flex-col gap-2 flex-[30%] sticky top-0">
                    <Card className={cn("shadow-none w-full")}>
                        <CardHeader>
                            <CardTitle>Bio</CardTitle>
                            <CardDescription>{faker.lorem.paragraph()}</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="pb-5 flex-[70%]">
                    <ScrollArea className={cn("h-auto lg:h-[80vh]")} >
                        {[...Array(20)].map((_, i) => (
                            <Card key={i} className={cn("shadow-none w-full mt-2 first:mt-0 last:mb-2")}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} className="object-cover" />
                                            <AvatarFallback>SM</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="font-semibold">{faker.person.fullName()}</div>
                                            <div className="text-sm text-muted-foreground line-clamp-1">
                                                {faker.lorem.lines()}
                                            </div>
                                            <div className="text-xs text-muted-foreground">{utils.formatDate(faker.date.recent())}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </main>
    )
}