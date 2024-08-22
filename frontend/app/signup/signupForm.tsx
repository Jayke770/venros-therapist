"use client"
import { useState } from "react"
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
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import useLanguages from "@/hooks/useLanguages"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { authHandler } from "@/lib/auth"
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
    }), { required_error: "Please select atleast one language" }),
    positionApplying: z.union([z.literal("counsellor"), z.literal("clinical psychologist"), z.literal("specialized therapist")], { required_error: "Position Applying is required" }),
    educationQualification: z.string().min(10, { message: "Education Qualification is required." }),
    yrsOfExp: z.string().min(1, { message: "Years of Experience  is required." }),
    mphilOrPhd: z.custom<File>().optional(),
    rciLicense: z.custom<File>().optional(),
    degreeOrMarksheet: z.custom<File>().optional(),
    workExpLetter: z.custom<File>().optional(),
    otherCertifications: z.custom<File>().optional(),
    email: z.string().email({ message: 'Email is invalid' }),
    password: z.string().min(8, { message: "Password must be more than 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be more than 8 characters" })
})
const userSignUpFormSchema = z.object({
    fullName: z.string().min(5, { message: "Invalid Full Name." }),
    pNumber: z.string().min(9, { message: "Invalid Phone Number." }),
    gender: z.union([z.literal("male"), z.literal("female"), z.literal("undisclosed")], { required_error: "Gender is required" }),
    email: z.string().email({ message: 'Email is invalid' }),
    password: z.string().min(8, { message: "Password must be more than 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be more than 8 characters" })
})
export default function SignupForm() {
    const { languages } = useLanguages()
    const [isCreatingAccount, setCreatingAccount] = useState<boolean>(false)
    const therapistSignUpForm = useForm<z.infer<typeof therapistSignUpFormSchema>>({
        resolver: zodResolver(therapistSignUpFormSchema),
        defaultValues: {
            fullName: "",
            address: "",
            dob: new Date(),
            gender: "male",
            pNumber: "" as any,
            languages: [],
            positionApplying: "" as any,
            confirmPassword: "",
            educationQualification: "",
            email: "",
            mphilOrPhd: undefined,
            password: "",
            rciLicense: undefined,
            workExpLetter: undefined,
            otherCertifications: undefined,
            degreeOrMarksheet: undefined,
            yrsOfExp: "",
        },
    })
    const userSignUpForm = useForm<z.infer<typeof userSignUpFormSchema>>({
        resolver: zodResolver(userSignUpFormSchema),
        defaultValues: {
            fullName: "",
            gender: "male",
            pNumber: "" as any,
            confirmPassword: "",
            email: "",
            password: "",
        },
    })
    const onSubmitSignUpForm = async (type: "therapist" | "user", data: z.infer<typeof therapistSignUpFormSchema> | z.infer<typeof userSignUpFormSchema>) => {
        setCreatingAccount(true)
        let formData = new FormData()
        formData.append("type", type ?? "user")
        //@ts-ignore
        Object.keys(data).map(e => e === "languages" ? formData.append(e, JSON.stringify(data[e])) : formData.append(e, data[e]))
        const promise = () => new Promise<{ status: boolean, message?: string }>((resolve, reject) => authHandler.signUp(formData).then(e => e?.status ? resolve(e) : reject(e.message)));
        toast.promise(promise, {
            richColors: true,
            dismissible: false,
            loading: 'Creating Account...',
            success: (data) => {
                setCreatingAccount(false)
                return data.message
            },
            error: (e) => {
                setCreatingAccount(false)
                return e
            },
        });

    }
    return (
        <main className=" container flex justify-center items-center p-5 lg:py-10 lg:px-24">
            <Tabs defaultValue="client" className=" transition-all">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="client">Client Registration</TabsTrigger>
                    <TabsTrigger value="therapist">Therapist Registration</TabsTrigger>
                </TabsList>
                <TabsContent value="client" className="w-full lg:w-[500px]">
                    <Form {...userSignUpForm}>
                        <form onSubmit={userSignUpForm.handleSubmit((e) => onSubmitSignUpForm("user", e))}>
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Client Registration</CardTitle>
                                    <CardDescription>Fill out the form below to create your client account.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={userSignUpForm.control}
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
                                            control={userSignUpForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Enter email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={userSignUpForm.control}
                                        name="pNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="Phone Number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={userSignUpForm.control}
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
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={userSignUpForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={userSignUpForm.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Passowrd</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button disabled={isCreatingAccount} type="submit" className="w-full">
                                        <Loader2 className={`${isCreatingAccount ? 'block' : 'hidden'} mr-2 h-4 w-4 animate-spin `} />
                                        Register as Client
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="therapist" className="w-full lg:w-[900px]">
                    <Form {...therapistSignUpForm}>
                        <form onSubmit={therapistSignUpForm.handleSubmit((e) => onSubmitSignUpForm("therapist", e))}>
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Therapist Registration</CardTitle>
                                    <CardDescription>Fill out the form below to create your therapist account.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="dob"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col lg:mt-2.5 col-span-full lg:col-span-1">
                                                    <FormLabel>Date of birth</FormLabel>
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
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="col-span-full">
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Password" type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Password" type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                                <FormItem className="flex flex-col md:mt-2.5">
                                                    <FormLabel className="">Languages Spoken</FormLabel>
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
                                                                        {languages?.filter(e => !!field.value.find(x => x.code === e.code))?.map((language) => (
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
                                                                                        "mr-2 h-4 w-4 opacity-100")}
                                                                                />
                                                                                {language.name}
                                                                            </CommandItem>
                                                                        ))}
                                                                        {languages?.filter(e => !field.value.find(x => x.code === e.code))?.map((language) => (
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
                                                                                        "mr-2 h-4 w-4 opacity-0")}
                                                                                />
                                                                                {language.name}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <div>
                                                        {field.value.map(e => <Badge key={`sel-${e.code}`} className="m-1">{e.name}</Badge>)}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="text-sm font-bold">Employment/Educational Information</div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="positionApplying"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Position Applying</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger >
                                                                <SelectValue placeholder="Select Position" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="counsellor">Counsellor</SelectItem>
                                                                    <SelectItem value="clinical psychologist">Clinical Psychologist</SelectItem>
                                                                    <SelectItem value="specialized therapist">Specialized Therapist</SelectItem>
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
                                            name="yrsOfExp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Years of Experience</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Years of Experience" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={therapistSignUpForm.control}
                                        name="educationQualification"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Educational Qualification</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Educational Qualification" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="mphilOrPhd"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>{"M.Phil/Ph.D Degree (If Applicable)"}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="file"
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="rciLicense"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>{"RCI License (If Applicable)"}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            {...field}
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="degreeOrMarksheet"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>{"Masters Degree/Marksheet"}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            {...field}
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="otherCertifications"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>{"Other Certifications ( if Applicable)"}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            {...field}
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={therapistSignUpForm.control}
                                            name="workExpLetter"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>{"Work Experience Letter"}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            {...field}
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button disabled={isCreatingAccount} type="submit" className="w-full">
                                        <Loader2 className={`${isCreatingAccount ? 'block' : 'hidden'} mr-2 h-4 w-4 animate-spin `} />
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