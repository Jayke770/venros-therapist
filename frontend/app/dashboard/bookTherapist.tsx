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
import * as dateFns from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useMediaQuery from "@/hooks/useMediaQuery";
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn, dayJs } from "@/lib/utils";
const bookFormSchema = z.object({
    service: z.string().min(1),
    bookDate: z.date({ required_error: "Invalid Date" }),
    bookTime: z.string({ required_error: "Invalid Time Slot" }).min(1),
})
const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
]
const BookForm = ({ isDesktop }: { isDesktop: boolean }) => {
    const bookForm = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            service: "",
            bookDate: undefined,
            bookTime: undefined
        },
    })
    function onSubmitBooking(values: z.infer<typeof bookFormSchema>) {
        console.log(values)
    }
    useEffect(() => {
        const subscription = bookForm.watch((value, { name, type }) =>
            console.log(value, name, type)
        )
        return () => subscription.unsubscribe()
    }, [])

    return (
        <Form {...bookForm}>
            <form onSubmit={bookForm.handleSubmit(onSubmitBooking)} className="p-4">
                <div className="flex flex-col gap-2  mb-4">
                    <FormField
                        control={bookForm.control}
                        name="service"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="trauma">Trauma</SelectItem>
                                            <SelectItem value="depression">Depression</SelectItem>
                                            <SelectItem value="anxiety">Anxiety</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid gap-2 md:grid-cols-2">
                        <FormField
                            control={bookForm.control}
                            name="bookDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-4">
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            dateFns.format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={date => date <= new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={bookForm.control}
                            name="bookTime"
                            render={({ field }) => (
                                <FormItem className="mt-1.5">
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue className={cn(!field.value && "!text-muted-foreground")} placeholder="Select Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {timeSlots.map(e => (
                                                        <SelectItem key={e} value={e}>{e}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {isDesktop ? (
                    <DialogFooter >
                        <Button type="submit">Book Appointment</Button>
                    </DialogFooter>
                ) : (
                    <DrawerFooter >
                        <Button type="submit">Book Appointment</Button>
                    </DrawerFooter>
                )}
            </form>
        </Form>
    )
}
export default function BookTherapist({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (e: boolean) => void }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return (
        <>
            {isDesktop ? (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Book Therapist</DialogTitle>
                        </DialogHeader>
                        <BookForm isDesktop={isDesktop} />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Book Therapist</DrawerTitle>
                        </DrawerHeader>
                            <BookForm isDesktop={isDesktop} />
                    </DrawerContent>
                </Drawer>
            )}
        </>
    )
}