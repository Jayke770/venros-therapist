import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Sparkles, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { faker } from '@faker-js/faker'
import { cn, utils } from "@/lib/utils"
import type { IAuthSession } from '@/types'
export default async function NavBar(props: { session?: IAuthSession }) {
    return (
        <header className="flex h-20 w-full shrink-0 items-center justify-between lg:justify-normal px-4 md:px-24 border-b">
            <Link href="/dashboard" className="flex items-center justify-center">
                <Sparkles className="h-6 w-6 mr-4" /> Company
                <span className="sr-only">Toggle menu</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                {/* <div className="hidden sm:flex gap-4 sm:gap-6">
                        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Therapists
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Contact
                        </Link>
                    </div> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <MessageCircle className="w-7 h-7" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-screen  md:w-[400px]">
                        <div className="p-4 border-b sticky">
                            <Input type="search" placeholder="Search messages..." className="h-9 w-full" />
                        </div>
                        <div className="max-h-[400px] overflow-auto">
                            {[...Array(12)].map((_, i) => (
                                <DropdownMenuItem key={i} className=" cursor-pointer" asChild>
                                    <Link href={`?chatId=${i}`}>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} />
                                                <AvatarFallback>SM</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="font-semibold">{faker.person.fullName()}</div>
                                                <div className="text-sm text-muted-foreground line-clamp-1">
                                                    {faker.lorem.lines()}
                                                </div>
                                                <div className="text-xs text-muted-foreground">{utils.formatDate(faker.date.recent())}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar>
                                <AvatarImage src={undefined} alt={props?.session?.name} className=" object-cover" />
                                <AvatarFallback>{props?.session?.name?.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/user?id=${props?.session?.id || ""}`}>
                                My Account
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={"/api/auth/logout"}>
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full sm:hidden">
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="sm:hidden">
                            <div className="grid gap-4 p-4">
                                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    Home
                                </Link>
                                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    Therapists
                                </Link>
                                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    About
                                </Link>
                                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    Contact
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet> */}
            </nav>
        </header>
    )
}