"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { Loader2 } from "lucide-react"
const loginFormSchema = z.object({
    email: z.string().email({ message: 'Email is invalid' }),
    password: z.string().min(8, { message: "Password is required" }),
})
export default function LoginForm() {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false)
    const logninForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const onSubmitLoginForm = async (data: z.infer<typeof loginFormSchema>) => {
        try {
            setIsSigningIn(true)
            const result = await signIn("credentials", { redirect: false, callbackUrl: undefined, ...data })
            setIsSigningIn(false)
        } catch (e) {
            console.log(e)
            setIsSigningIn(false)
        }
    }
    return (
        <Card className={"w-full lg:w-[400px] border-none shadow-none"}>
            <Form {...logninForm}>
                <form onSubmit={logninForm.handleSubmit(onSubmitLoginForm)}>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>Get the best Therapist in one click.</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={logninForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={logninForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Link href={"#"} className=" self-end text-muted-foreground text-sm hover:text-primary hover:underline underline-offset-4">Forgot Password</Link>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button disabled={isSigningIn} className="w-full" type="submit">
                            <Loader2 className={`${isSigningIn ? 'block' : 'hidden'} mr-2 h-4 w-4 animate-spin `} />
                            Login
                        </Button>
                        <div className=" flex justify-start w-full mt-3">
                            <div className="text-muted-foreground text-sm flex ">
                                {"Don't have an account?"}
                                <Link href="/signup" className=" ml-1 hover:text-primary hover:underline underline-offset-4">Signup</Link>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}