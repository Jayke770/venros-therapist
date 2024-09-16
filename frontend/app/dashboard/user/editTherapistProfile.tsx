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
const editProfileSchema = z.object({
    profilePicture: z.array(z.custom<File>()).optional(),
    coverPhoto: z.array(z.custom<File>()).optional(),
    bio: z.string().max(200).optional()
})
const editScheduleSchema = z.object({

})
const dropzoneConfig = {
    accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 2,
    maxSize: 5 * 1024 * 1024,
} satisfies DropzoneOptions;
const scheduleTypes = ['daily', 'weekly']
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8 // Start from 8 AM
    const amPm = hour < 12 ? 'AM' : 'PM'
    const hour12 = hour > 12 ? hour - 12 : hour
    return `${hour12}:00 ${amPm}`
})
type Availability = {
    [key: string]: boolean[]
}
export default function EditProfile({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (e: boolean) => void }) {
    const profileForm = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {

        },
    })
    const [currentWeek, setCurrentWeek] = useState(0)
    const [availability, setAvailability] = useState<Availability>({})
    const startDate = dateFns.startOfWeek(dateFns.addWeeks(new Date(), currentWeek))
    const endDate = dateFns.addDays(startDate, 6)
    const toggleSlot = (day: string, slotIndex: number) => {
        setAvailability(prev => {
            const key = `${currentWeek}-${day}`
            const dayAvailability = prev[key] || Array(timeSlots.length).fill(false)
            const updatedDayAvailability = [...dayAvailability]
            updatedDayAvailability[slotIndex] = !updatedDayAvailability[slotIndex]
            return { ...prev, [key]: updatedDayAvailability }
        })
    }
    function onSubmitEditProfile(values: z.infer<typeof editProfileSchema>) {
        console.log(values)
    }
    console.log(availability)
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
                                                            className={cn(field.value?.[0] && "hidden")}
                                                            dropzoneOptions={dropzoneConfig}
                                                            value={field.value as any}
                                                            onValueChange={field.onChange}
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
                                                        {field.value?.[0] && (
                                                            <div className="relative">
                                                                <Button
                                                                    onClick={() => field.onChange(null)}
                                                                    size={"icon"}
                                                                    className="rounded-full absolute right-0">
                                                                    <X className="w-5 h-5" />
                                                                </Button>
                                                                <Image
                                                                    src={URL.createObjectURL(field.value[0])}
                                                                    alt={field.value[0].name}
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
                                                            className={cn(field.value?.[0] && "hidden")}
                                                            dropzoneOptions={dropzoneConfig}
                                                            value={field.value as any}
                                                            onValueChange={field.onChange}
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
                                                        {field.value?.[0] && (
                                                            <div className="relative w-full">
                                                                <Button
                                                                    onClick={() => field.onChange(null)}
                                                                    size={"icon"}
                                                                    className="rounded-full absolute right-1 -top-2">
                                                                    <X className="w-5 h-5" />
                                                                </Button>
                                                                <Image
                                                                    src={URL.createObjectURL(field.value[0])}
                                                                    alt={field.value[0].name}
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
                            <div className="flex flex-col gap-0.5 md:gap-2">
                                <div className=" sticky top-0 z-10 bg-background">
                                    <div className="flex space-x-2 mb-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))}
                                            disabled={currentWeek === 0}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <div className="text-sm font-medium grid w-full place-items-center">
                                            {dateFns.format(startDate, 'MMM d')} - {dateFns.format(endDate, 'MMM d, yyyy')}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCurrentWeek(prev => Math.min(3, prev + 1))}
                                            disabled={currentWeek === 3}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-8 text-xs place-items-center">
                                        <div className="font-bold text-center">Time</div>
                                        {daysOfWeek.map(day => (
                                            <div key={day} className="font-bold text-center">{day.slice(0, 3)}</div>
                                        ))}
                                    </div>
                                </div>
                                {timeSlots.map((time, timeIndex) => (
                                    <div key={time} className="grid grid-cols-8 gap-1 lg:gap-2 text-xs place-items-center">
                                        <div className="py-1 text-xs text-center lg:whitespace-nowrap">{time}</div>
                                        {daysOfWeek.map(day => {
                                            const key = `${currentWeek}-${day}`
                                            const isAvailable = availability[key]?.[timeIndex]
                                            return (
                                                <motion.button
                                                    key={`${day}-${time}`}
                                                    className={`w-full h-8 lg:h-10 rounded-md ${isAvailable ? 'bg-lime-500' : 'bg-zinc-300'} hover:opacity-80 transition-opacity`}
                                                    onClick={() => toggleSlot(day, timeIndex)}
                                                    aria-label={`Toggle availability for ${day} at ${time}`}
                                                    whileHover={{ scale: 1 }}
                                                    whileTap={{ scale: 0.8 }}
                                                />
                                            )
                                        })}
                                    </div>
                                ))}
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