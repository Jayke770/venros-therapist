"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { faker } from '@faker-js/faker'
import { AwardIcon, CalendarCheck, CameraIcon, LocateIcon, MailIcon, MessageCircle, Pencil, PhoneIcon } from "lucide-react"
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
import type { IAuthSession } from "@/types"
import useGetUser from "@/hooks/useGetUser"
import EditProfile from "./therapist/editTherapistProfile"
import { useCallback, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useMediaQuery from "@/hooks/useMediaQuery"
export default function ViewUserProfile(props: {
    session?: IAuthSession,
    userId?: string
}) {
    const { userData } = useGetUser(props?.userId)
    return (
        <>
            <main className=" px-4 lg:px-36 py-5 flex flex-col lg:flex-row gap-2">
                <div className="flex flex-col gap-2 flex-[70%]">
                    <div
                        style={{
                            backgroundImage: `url(/file/${userData?.data?.coverPhoto})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}
                        className="relative rounded-2xl h-72 lg:h-80 min-w-[250px] w-full">
                        <div className=" absolute lg:left-5 -bottom-44 lg:-bottom-16 lg:right-5 w-full flex justify-between gap-3 lg:gap-0 flex-col lg:flex-row lg:w-auto transition-all">
                            <div className="flex flex-col lg:flex-row">
                                <div className="flex justify-center items-center">
                                    <div className="relative">
                                        <Avatar className="w-40 h-40 border-1 border-white shadow-lg">
                                            <AvatarImage src={`/file/${userData?.data?.profilePhoto}`} alt="Therapist" className=" object-cover" />
                                            <AvatarFallback>JK</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end items-center lg:items-start px-4 h-full mt-3 lg:mt-0">
                                    <h1 className="text-2xl font-bold text-center">{userData?.data?.name}</h1>
                                    <p className="text-muted-foreground text-center">N/A</p>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-center items-end">
                                <Button>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row mt-52 w-full lg:mt-24">
                        <Card className={cn("shadow-none w-full")}>
                            <CardContent className="p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="text-md font-semibold">About</div>
                                    <div className="text-muted-foreground text-base ">{faker.lorem.paragraph()}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-md font-semibold">Contact Information</div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <MailIcon className="w-5 h-5 text-muted-foreground" />
                                            <span className="break-all">{userData?.data?.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                                            <span>{faker.phone.number()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LocateIcon className="w-5 h-5 text-muted-foreground" />
                                            <span>{userData?.data.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}