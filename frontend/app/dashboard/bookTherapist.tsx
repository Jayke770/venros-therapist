import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn, dayJs } from "@/lib/utils";
const bookFormSchema = z.object({
    service: z.string().min(1),
    bookDate: z.date()
})
const BookForm = () => {
    const bookForm = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            service: "",
            bookDate: new Date()
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
    }, [bookForm.watch])

    return (
        <Form {...bookForm}>
            <form onSubmit={bookForm.handleSubmit(onSubmitBooking)} className="p-4">
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
                <FormField
                    control={bookForm.control}
                    name="bookDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mt-4">
                            <FormLabel>Select Date</FormLabel>
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
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                        <BookForm />
                        <DialogFooter>
                            <Button>Book Now</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Book Therapist</DrawerTitle>
                        </DrawerHeader>
                        <BookForm />
                        <DrawerFooter>
                            <Button>Book Now</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    )
}