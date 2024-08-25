"use client"
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
import { useMediaMatch } from 'rooks'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
const bookFormSchema = z.object({
    username: z.string().min(2).max(50),
})
const BookForm = ({ form }: { form: UseFormReturn<z.infer<typeof bookFormSchema>, any, undefined> }) => {
    return (
        <div className="grid gap-4 p-6">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
export default function BookTherapist({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (e: boolean) => void }) {
    const isDesktop = useMediaMatch("(min-width: 768px)")
    const bookForm = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            username: "",
        },
    })
    function onSubmitBooking(values: z.infer<typeof bookFormSchema>) {
        console.log(values)
    }
    return (
        <Form {...bookForm}>
            <form onSubmit={bookForm.handleSubmit(onSubmitBooking)}>
                {isDesktop ? (
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Book Therapist</DialogTitle>
                            </DialogHeader>
                            <BookForm form={bookForm} />
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
                            <BookForm form={bookForm} />
                            <DrawerFooter>
                                <Button>Book Now</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                )}
            </form>
        </Form>
    )
}
