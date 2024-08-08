import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
export default async function Signup() {
    return (
        <main className=" container flex justify-center items-center p-5 lg:py-10 lg:px-24">
            <Tabs defaultValue="client" className="w-full lg:w-[600px]">
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
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Therapist Registration</CardTitle>
                            <CardDescription>Fill out the form below to create your therapist account.</CardDescription>
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
                            <div className="space-y-2">
                                <Label htmlFor="credentials">Professional Credentials</Label>
                                <Input id="credentials" placeholder="Enter your credentials" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expertise">Areas of Expertise</Label>
                                <Textarea id="expertise" placeholder="Enter your areas of expertise" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Register as Therapist
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}