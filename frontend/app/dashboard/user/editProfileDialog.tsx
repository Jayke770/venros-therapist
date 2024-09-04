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
import { CalendarIcon, CameraIcon, ImagePlus, X } from "lucide-react";
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
const editProfileSchema = z.object({
    profilePicture: z.array(z.custom<File>()).optional(),
    coverPhoto: z.array(z.custom<File>()).optional(),
    bio: z.string().max(200).optional()
})
const dropzoneConfig = {
    accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 2,
    maxSize: 5 * 1024 * 1024,
} satisfies DropzoneOptions;

export default function EditProfile({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (e: boolean) => void }) {
    const profileForm = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {

        },
    })
    function onSubmitEditProfile(values: z.infer<typeof editProfileSchema>) {
        console.log(values)
    }
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveModalContent className=" p-0">
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

                    </TabsContent>
                </Tabs>
            </ResponsiveModalContent>
        </ResponsiveModal>
    )
}