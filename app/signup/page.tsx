"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MultiSelect } from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import useLanguages from "@/hooks/useLanguages"
import type { ILanguages } from "@/types"
import { Badge } from "@/components/ui/badge"
const therapistSignUpFormSchema = z.object({
    fullName: z.string().min(5, { message: "Invalid Full Name." }),
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
    pNumber: z.string().min(9, { message: "Invalid Phone Number." }),
    address: z.string().min(5, { message: "Invalid Address." }),
    gender: z.union([z.literal("male"), z.literal("female"), z.literal("undisclosed")], { required_error: "Gender is required" }),
    languages: z.array(z.object({
        name: z.string(),
        code: z.string()
    }), { required_error: "Please select atleast one language" })
})
export default function Signup() {
    const { languagesLoading, languages } = useLanguages()
    const therapistSignUpForm = useForm<z.infer<typeof therapistSignUpFormSchema>>({
        resolver: zodResolver(therapistSignUpFormSchema),
        defaultValues: {
            fullName: "",
            address: "",
            dob: new Date(),
            gender: "male",
            pNumber: "" as any,
            languages: []
        },
    })
    const onSubmitSignUpForm = (values: z.infer<typeof therapistSignUpFormSchema>) => {
        console.log(values)
    }
    return (
        <main className=" container flex justify-center items-center p-5 lg:py-10 lg:px-24">
            <Tabs defaultValue="therapist" className="w-full lg:w-[600px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="client">Client Registration</TabsTrigger>
                    <TabsTrigger value="therapist">Therapist Registration</TabsTrigger>
                </TabsList>
                <TabsContent value="client">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Client Registration</CardTitle>
                            <CardDescription>Fill out the form below to create your client account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pnumber">Phone Number</Label>
                                <Input id="pnumber" type="tel" placeholder="Phone Number" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Enter a password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Register as Client
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="therapist">
                    <Form {...therapistSignUpForm}>
                        <form onSubmit={therapistSignUpForm.handleSubmit(onSubmitSignUpForm)}>
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Therapist Registration</CardTitle>
                                    <CardDescription>Fill out the form below to create your therapist account.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 space-y-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="fullName"
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
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="pNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="tel"
                                                            inputMode="tel"
                                                            placeholder="Phone Number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="dob"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Date of birth</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "pl-3 text-left font-normal mt-2",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
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
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 space-y-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger >
                                                                <SelectValue placeholder="Select a Gender" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="male">Male</SelectItem>
                                                                    <SelectItem value="female">Female</SelectItem>
                                                                    <SelectItem value="undisclosed">Undisclosed</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="languages"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="mb-0.5">Languages Spoken</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "justify-between mt-10",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    Select language
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search language..." />
                                                                <CommandList>
                                                                    <CommandEmpty>No language found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {languages?.map((language) => (
                                                                            <CommandItem
                                                                                value={language.name}
                                                                                key={language.code}
                                                                                onSelect={() => {
                                                                                    let selectedLanguages = field.value
                                                                                    const selectedIndex = selectedLanguages.findIndex(e => e.code === language.code)
                                                                                    selectedIndex < 0 ? selectedLanguages.push(language) : selectedLanguages.splice(selectedIndex, 1)
                                                                                    therapistSignUpForm.setValue("languages", selectedLanguages)
                                                                                }}>
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        field.value.find(x => x.code === language.code)
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {language.name}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        {field.value.map(e => <Badge key={`sel-${e.code}`} className="m-1">{e.name}</Badge>)}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pnumber">Phone Number</Label>
                                    <Input id="pnumber" type="tel" placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Enter a password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="credentials">Professional Credentials</Label>
                                <Input id="credentials" placeholder="Enter your credentials" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expertise">Areas of Expertise</Label>
                                <Textarea id="expertise" placeholder="Enter your areas of expertise" />
                            </div> */}
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full">
                                        Register as Therapist
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
        </main>
    )
}