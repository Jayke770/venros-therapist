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

const EditProfileForm = ({ isDesktop }: { isDesktop: boolean }) => {
    const profileForm = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {

        },
    })
    function onSubmitEditProfile(values: z.infer<typeof editProfileSchema>) {
        console.log(values)
    }
    console.log(profileForm.getValues())
    return (
        <Form {...profileForm}>
            <form
                onSubmit={profileForm.handleSubmit(onSubmitEditProfile)}
                className="flex flex-col gap-2">
                <ScrollArea className=" max-h-[80dvh] px-4 py-2 lg:px-0">
                    <div className="flex flex-col gap-3">
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
                                        <AutosizeTextarea
                                            {...field}
                                            className=" resize-none !ring-0 focus:border-foreground"
                                            placeholder="Bio"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </ScrollArea>
                {isDesktop ? (
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                ) : (
                    <DrawerFooter >
                        <Button type="submit">Save Changes</Button>
                    </DrawerFooter>
                )}
            </form>
        </Form>
    )
}
export default function EditProfile({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (e: boolean) => void }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return (
        <>
            {isDesktop ? (
                <Dialog open={isOpen} onOpenChange={setIsOpen} >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Edit Profile</DialogTitle>
                        </DialogHeader>
                        <EditProfileForm isDesktop={isDesktop} />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={isOpen} onOpenChange={setIsOpen} >
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="text-xl">Edit Profile</DrawerTitle>
                        </DrawerHeader>
                        <EditProfileForm isDesktop={isDesktop} />
                    </DrawerContent>
                </Drawer>
            )}
        </>
    )
}