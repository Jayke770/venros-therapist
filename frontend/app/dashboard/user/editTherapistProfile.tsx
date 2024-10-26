"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import * as dateFns from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useMediaQuery from "@/hooks/useMediaQuery";
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CameraIcon, ImagePlus, X, ChevronsUpDown, Check, PlusCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { cn, dayJs } from "@/lib/utils";
import { faker, fi } from "@faker-js/faker";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import {
    FileUploader,
    FileInput,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/file-uploader";
import type { DropzoneOptions } from "react-dropzone";
import { Textarea } from '@/components/ui/textarea';
import {
    ResponsiveModal,
    ResponsiveModalContent,
    ResponsiveModalDescription,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { motion } from 'framer-motion'
import { toast } from "sonner"
const editProfileSchema = z.object({
    profilePicture: z.custom<File>().optional(),
    coverPhoto: z.custom<File>().optional(),
    bio: z.string().max(200).optional()
})
const editScheduleSchema = z.object({

})
const dropzoneConfig = {
    accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
} satisfies DropzoneOptions;
const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8 // Start from 8 AM
    const amPm = hour < 12 ? 'AM' : 'PM'
    const hour12 = hour > 12 ? hour - 12 : hour
    return `${hour12}:00 ${amPm}`
})
type Availability = {
    [key: string]: {
        startDate: Date,
        endDate: Date,
        slots: {
            dateAndTime: Date
        }[]
    }
}
export default function EditProfile({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (e: boolean) => void }) {
    const profileForm = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            bio: ""
        },
    })
    const [currentDate, setCurrentDate] = useState(new Date())
    const [availability, setAvailability] = useState<Availability>({})
    const toggleSlot = (day: Date, slotIndex: number) => {
        const weekKey = dateFns.format(dateFns.startOfWeek(day), 'yyyy-MM-dd')
        const slotTime = dateFns.setHours(dateFns.setMinutes(day, 0), slotIndex + 8)
        setAvailability(prev => {
            const weekAvailability = prev[weekKey] || {
                startDate: dateFns.startOfWeek(day),
                endDate: dateFns.endOfWeek(day),
                slots: []
            }

            const slotExists = weekAvailability.slots.some(slot =>
                dateFns.isSameDay(slot.dateAndTime, slotTime) && slot.dateAndTime.getHours() === slotTime.getHours()
            )

            if (slotExists) {
                return {
                    ...prev,
                    [weekKey]: {
                        ...weekAvailability,
                        slots: weekAvailability.slots.filter(slot =>
                            !(dateFns.isSameDay(slot.dateAndTime, slotTime) && slot.dateAndTime.getHours() === slotTime.getHours())
                        )
                    }
                }
            } else {
                return {
                    ...prev,
                    [weekKey]: {
                        ...weekAvailability,
                        slots: [...weekAvailability.slots, { dateAndTime: slotTime }]
                    }
                }
            }
        })
    }
    const isSlotDisabled = (day: Date, slotIndex: number) => {
        const currentTime = new Date()
        const slotTime = dateFns.setHours(dateFns.setMinutes(day, 0), slotIndex + 8)
        return dateFns.isBefore(slotTime, currentTime) || (dateFns.isSameDay(slotTime, currentTime) && dateFns.isBefore(slotTime, currentTime))
    }
    const isSlotAvailable = (day: Date, slotIndex: number) => {
        const weekKey = dateFns.format(dateFns.startOfWeek(day), 'yyyy-MM-dd')
        const slotTime = dateFns.setHours(dateFns.setMinutes(day, 0), slotIndex + 8)
        return availability[weekKey]?.slots.some(slot =>
            dateFns.isSameDay(slot.dateAndTime, slotTime) && slot.dateAndTime.getHours() === slotTime.getHours()
        ) || false
    }
    const onSubmitEditProfile = async (data: z.infer<typeof editProfileSchema>) => {
        toast.promise(new Promise<string>(async (resolve, reject) => {
            try {
                const endpoint = "/api/users/editprofile"
                let formData = new FormData()
                Object.keys(data).map((key) => formData.append(key, (data as any)[key]))
                const response: { status: boolean, message: string } = await fetch(endpoint, {
                    method: 'post',
                    body: formData
                }).then(e => e.json())
                if (response?.status) {
                    resolve(response.message)
                } else {
                    reject(response.message)
                }
            } catch (e) {
                reject("Try again later")
            }
        }), {
            position: "top-center",
            richColors: true,
            dismissible: false,
            loading: 'Please wait...',
            duration: 1000,
            success: (e) => e,
            error: (e) => e.toString()
        });
    }
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveModalContent className=" p-0 max-h-[90dvh]">
                <ResponsiveModalHeader className="px-4 pt-4 pb-3">
                    <ResponsiveModalTitle className="text-xl">Edit Profile & Schedules</ResponsiveModalTitle>
                </ResponsiveModalHeader>
                <Tabs defaultValue="profile" className=" transition-all">
                    <div className="px-5 w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="schedules">Schedules</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="profile">
                        <Form {...profileForm}>
                            <form
                                onSubmit={profileForm.handleSubmit(onSubmitEditProfile)}
                                className="flex flex-col">
                                <ScrollArea className=" max-h-[60dvh] flex flex-col gap-3 px-5">
                                    <FormField
                                        control={profileForm.control}
                                        name="profilePicture"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Profile Picture</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-col justify-center items-center">
                                                        <FileUploader
                                                            className={cn(field.value && "hidden")}
                                                            dropzoneOptions={dropzoneConfig}
                                                            value={field.value as any}
                                                            onValueChange={e => field.onChange(e?.[0])}
                                                        >
                                                            <FileInput>
                                                                <div className="flex flex-col items-center rounded-md justify-center min-h-40 border bg-background p-4">
                                                                    <ImagePlus />
                                                                    <p className="mb-1 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                                                        <span className="font-semibold">Click to upload</span>
                                                                        &nbsp; or drag and drop
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {"*.jpg, *.jpeg, *.png"}
                                                                    </p>
                                                                </div>
                                                            </FileInput>
                                                        </FileUploader>
                                                        {field.value && (
                                                            <div className="relative">
                                                                <Button
                                                                    onClick={() => field.onChange(null)}
                                                                    size={"icon"}
                                                                    className="rounded-full absolute right-0">
                                                                    <X className="w-5 h-5" />
                                                                </Button>
                                                                <Image
                                                                    src={URL.createObjectURL(field.value)}
                                                                    alt={field.value.name}
                                                                    height={400}
                                                                    width={400}
                                                                    className="size-40 p-0 rounded-full"
                                                                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="coverPhoto"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cover Photo</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-col justify-center items-center">
                                                        <FileUploader
                                                            className={cn(field.value && "hidden")}
                                                            dropzoneOptions={dropzoneConfig}
                                                            value={field.value as any}
                                                            onValueChange={e => field.onChange(e?.[0])}
                                                        >
                                                            <FileInput>
                                                                <div className="flex flex-col items-center rounded-md justify-center min-h-40 border bg-background p-4">
                                                                    <ImagePlus />
                                                                    <p className="mb-1 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                                                        <span className="font-semibold">Click to upload</span>
                                                                        &nbsp; or drag and drop
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {"*.jpg, *.jpeg, *.png"}
                                                                    </p>
                                                                </div>
                                                            </FileInput>
                                                        </FileUploader>
                                                        {field.value && (
                                                            <div className="relative w-full">
                                                                <Button
                                                                    onClick={() => field.onChange(null)}
                                                                    size={"icon"}
                                                                    className="rounded-full absolute right-1 -top-2">
                                                                    <X className="w-5 h-5" />
                                                                </Button>
                                                                <Image
                                                                    src={URL.createObjectURL(field.value)}
                                                                    alt={field.value.name}
                                                                    height={400}
                                                                    width={400}
                                                                    className="h-40 w-full p-0 rounded-md"
                                                                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        className=" resize-none !ring-0 focus:border-foreground"
                                                        placeholder="Bio"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </ScrollArea>
                                <div className="px-5 pb-5 mt-3 w-full">
                                    <Button className="w-full" type="submit">Save Changes</Button>
                                </div>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="schedules">
                        <ScrollArea className=" max-h-[60dvh] flex flex-col gap-3 px-5">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentDate(prev => dateFns.addDays(prev, -7))}
                                        disabled={dateFns.isBefore(dateFns.startOfWeek(currentDate), new Date())}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <div className="text-sm font-medium">
                                        {dateFns.format(dateFns.startOfWeek(currentDate), 'MMM d')} - {dateFns.format(dateFns.addDays(dateFns.startOfWeek(currentDate), 6), 'MMM d, yyyy')}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentDate(prev => dateFns.addDays(prev, 7))}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-8 gap-1 text-xs">
                                    <div className="font-bold">Time</div>
                                    {Array.from({ length: 7 }, (_, i) => dateFns.addDays(dateFns.startOfWeek(currentDate), i)).map(day => (
                                        <div key={day.toISOString()} className="font-bold text-center">{dateFns.format(day, 'EEE')}</div>
                                    ))}
                                    {timeSlots.map((time, timeIndex) => (
                                        <div key={time}>
                                            <div className="py-1">{time}</div>
                                            {Array.from({ length: 7 }, (_, i) => dateFns.addDays(dateFns.startOfWeek(currentDate), i)).map(day => {
                                                const isDisabled = isSlotDisabled(day, timeIndex)
                                                const isAvailable = isSlotAvailable(day, timeIndex)
                                                return (
                                                    <motion.button
                                                        key={`${day}-${time}`}
                                                        className={`w-full h-8 lg:h-10 rounded-md ${isDisabled ? 'bg-gray-300 dark:bg-gray-400 cursor-not-allowed' : isAvailable ? 'bg-green-500' : 'bg-gray-200'} hover:opacity-80 transition-opacity`}
                                                        onClick={() => !isDisabled && toggleSlot(day, timeIndex)}
                                                        aria-label={`Toggle availability for ${day} at ${time}`}
                                                        whileHover={{ scale: 1 }}
                                                        whileTap={{ scale: 0.8 }}
                                                    />
                                                )
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                        <div className=" w-full mt-3 px-4 pb-3">
                            <Button className="w-full" >Save Availability</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </ResponsiveModalContent>
        </ResponsiveModal >
    )
}