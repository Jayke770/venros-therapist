"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { faker } from '@faker-js/faker'
import Image from "next/image"
import type { IAuthSession } from "@/types"
import { FilterIcon } from "lucide-react"
import useTherapist from "@/hooks/useTherapist"
export default function Dashboard(props: { session?: IAuthSession }) {
    const { therapist, therapistLoading } = useTherapist() 
    return (
        <>
            <main className="flex-1">
                <section className="px-4 md:px-24 flex flex-col gap-5">
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold mb-2">Find the Right Therapist</h1>
                        <p className="text-muted-foreground">Browse our directory of experienced mental health professionals.</p>
                    </div>
                    <div className="flex flex-col pb-5">
                        {/* filters & sort */}
                        <div className="flex items-center justify-between space-x-4 mb-4">
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center space-x-2">
                                            <FilterIcon className="h-5 w-5" />
                                            <span className="hidden md:block">Filter</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="w-56">
                                        <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Checkbox id="filter-location" />
                                            <Label htmlFor="filter-location" className="ml-2">
                                                Location
                                            </Label>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Checkbox id="filter-availability" />
                                            <Label htmlFor="filter-availability" className="ml-2">
                                                Availability
                                            </Label>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Checkbox id="filter-expertise" />
                                            <Label htmlFor="filter-expertise" className="ml-2">
                                                Expertise
                                            </Label>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Input className="w-full" type="search" placeholder="Search" />
                            </div>
                        </div>
                        {/* list of therapist */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {therapist?.data.map(data => (
                                <Card key={data.id} className="group  bg-[#f1f1f1]">
                                    <div className="relative h-60  overflow-hidden rounded-t-lg">
                                        <Image
                                            src={faker.image.urlLoremFlickr({ category: "doctors" })}
                                            alt={data.name}
                                            width={400}
                                            height={300}
                                            loading="lazy"
                                            className="h-full w-full transition-all duration-300 group-hover:scale-105"
                                            style={{ aspectRatio: "400/300", objectFit: "cover" }}
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex flex-col items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-lg font-semibold">{data?.name}</h3>
                                                <p className="text-muted-foreground">Anxiety, Depression, Trauma</p>
                                            </div>
                                            <div className="text-sm line-clamp-3">
                                                {faker.lorem.paragraph()}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="w-full flex justify-between gap-2">
                                            <Button asChild className="w-full">
                                                <Link
                                                    href="#" >
                                                    Book Now
                                                </Link>
                                            </Button>
                                            <Button asChild variant={"outline"} className="w-full">
                                                <Link
                                                    scroll={false}
                                                    href={`/dashboard/user?id=${data.id}`}>
                                                    View Profile
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Button variant="outline">Load More</Button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-muted text-muted-foreground px-4 md:px-6 py-6 flex flex-col gap-2 sm:flex-row items-center justify-between">
                <p className="text-xs">&copy; 2024 Therapy Connect. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Privacy Policy
                    </Link>
                </nav>
            </footer>
        </>
    )
}

