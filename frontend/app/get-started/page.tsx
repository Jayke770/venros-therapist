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
import { Label } from "@/components/ui/label"
import Link from "next/link"
export default async function GetStarted() {
    return (
        <main className="h-[100dvh] w-[100dvw] flex justify-center items-center p-5">
            <Card className={"w-full lg:w-[400px] border-none shadow-none"}>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Get the best Therapist in one click.</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username or Email</Label>
                                <Input id="username" placeholder="Username or Email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Password" type="password" />
                            </div>
                            <div className="flex justify-end">
                                <Link href={"#"} className=" self-end text-muted-foreground text-sm hover:text-primary hover:underline underline-offset-4">Forgot Password</Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full">Login</Button>
                    <div className=" flex justify-start w-full mt-3">
                        <div className="text-muted-foreground text-sm flex ">
                            {"Don't have an account?"}
                            <Link href="/signup" className=" ml-1 hover:text-primary hover:underline underline-offset-4">Signup</Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </main>
    )
}