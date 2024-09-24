"use client"
import { cn } from "@/lib/utils"
import { ArrowRight, CalendarCheck2, Compass, Facebook, MenuIcon, Sparkles, Star, Twitter, UserRoundSearch } from "lucide-react"
import Image from 'next/image'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { faker } from "@faker-js/faker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Input } from "@/components/ui/input"
export default function Home() {
  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center justify-between lg:justify-normal px-4 md:px-24">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mr-6 flex">
              <Sparkles className="h-6 w-6 mr-4" /> Company
              <span className="sr-only">Toggle menu</span>
            </Link>
            <div className="grid gap-1 py-6">
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                About
              </Link>
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden lg:flex">
          <Sparkles className="h-6 w-6 mr-4" />Company
          <span className="sr-only">Toggle menu</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-2">
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Button className={cn("ml-4")} size={"sm"} variant={"ghost"} asChild>
          <Link href={"/get-started"}>
            Sign In
          </Link>
        </Button>
      </header>
      <main className=" p-5 flex flex-col w-full">
        <section className="h-[calc(90vh-200px)] justify-center flex flex-col gap-3 w-full lg:px-32">
          <div className="flex flex-col gap-5">
            <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center lg:px-40">
              Your Trusted Source for Finding the Right Therapist
            </h1>
            <p className="text-center font-light px-10 md:px-40 lg:px-64">{"Discover a network of compassionate professionals ready to help you navigate life’s challenges. Tailored therapy solutions just a click away."}</p>
          </div>
          <div className="flex justify-center items-center gap-2 mt-10">
            <Button className={cn("ml-4 rounded-full")} size={"sm"} asChild>
              <Link href={"/signup"}>
                Get Started
              </Link>
            </Button>
          </div>
        </section>
        <section className="py-28 flex flex-col justify-center items-center">
          <h2 className=" font-extrabold text-2xl lg:text-4xl">How it Works</h2>
          <div className="grid lg:grid-cols-2 lg:gap-10 items-center mt-10 lg:px-36 py-4">
            <div className="hidden lg:flex justify-center items-center">
              <Image
                unoptimized
                src={faker.image.urlLoremFlickr({ category: "doctors" })}
                alt="fas"
                width={1000}
                height={1000}
                loading="lazy"
                className=" rounded-xl" />
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Compass className=" h-6 w-6" />
                  <span className=" font-medium text-md">Find Your Therapist</span>
                </div>
                <div className=" font-light text-base">{"Use our search tool to discover licensed therapists near you. Filter by location, specialty, or therapy style to find a professional that suits your unique needs."}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <UserRoundSearch className=" h-6 w-6" />
                  <span className=" font-medium text-md">Learn More About Your Match</span>
                </div>
                <div className=" font-light text-base">{"Explore detailed profiles, including qualifications, reviews, and areas of expertise. Get a better understanding of each therapist before making a decision."}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <CalendarCheck2 className=" h-6 w-6" />
                  <span className=" font-medium text-md">Schedule an Appointment</span>
                </div>
                <div className=" font-light text-base">{"Choose a convenient time and date for your session directly on the therapist's calendar. Booking has never been easier!"}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="h-[90vh] flex flex-col gap-3 justify-center items-center">
          <h3 className=" font-extrabold text-2xl lg:text-4xl text-center">What Our Customers Say</h3>
          <div className="mt-8 w-full">
            <div className="z-0 flex p-4 items-center justify-center w-full -space-x-2 *:ring *:ring-background">
              <Avatar className="z-0 size-12 md:size-16 lg:size-20">
                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} className=" object-cover" />
              </Avatar>
              <Avatar className="z-10 size-16 md:size-24 lg:size-28">
                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} className=" object-cover" />
              </Avatar>
              <Avatar className="z-20 size-24 md:size-36 lg:size-40">
                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} className=" object-cover" />
              </Avatar>
              <Avatar className="z-10 size-16  md:size-24 lg:size-28">
                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} className=" object-cover" />
              </Avatar>
              <Avatar className="z-0 size-12 md:size-16 lg:size-20">
                <AvatarImage src={faker.image.urlLoremFlickr({ category: "doctors" })} className=" object-cover" />
              </Avatar>
            </div>
            <div className="w-full max-w-lg mx-auto">
              <Carousel
                opts={{
                  loop: true
                }}
                plugins={[
                  Autoplay({
                    stopOnMouseEnter: true,
                    delay: 2000,
                  }),
                ]}>
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i}>
                      <Card className=" border-none shadow-none">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={faker.image.urlLoremFlickr({ category: "patient" })} alt="Dr. Jane Smith" className=" object-cover" />
                          </Avatar>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">{faker.person.fullName()}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">4.0</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">
                            {faker.lorem.paragraph()}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>
      </main>
      <footer className=" p-5 lg:p-10 lg:px-20">
        <Card>
          <CardContent className=" flex flex-col gap-3 lg:flex-row justify-between items-center p-4 lg:p-8">
            <div className="flex flex-col w-full lg:w-1/3">
              <Button asChild variant={"ghost"} className=" justify-start w-auto">
                <Link href="/" className="flex">
                  <Sparkles className="h-6 w-6 mr-4" /> Company
                </Link>
              </Button>
              <div className="flex flex-col gap-2 ml-5 mt-4">
                <div className=" font-medium text-xl">Sign up for our Newsletter</div>
                <div className="flex">
                  <Input type="email" placeholder="Email Addresss" className=" rounded-tr-none rounded-br-none border-r-0" />
                  <Button className="rounded-tl-none rounded-bl-none">
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex w-full lg:w-1/4 flex-col gap-3 ml-10 mt-4">
              <Link href="#" className=" text-sm font-medium hover:underline hover:outline-offset-1">
                Our Services
              </Link>
              <Link href="#" className=" text-sm font-medium hover:underline hover:outline-offset-1">
                About Us
              </Link>
              <Link href="#" className=" text-sm font-medium hover:underline hover:outline-offset-1">
                Terms of Service
              </Link>
              <Link href="#" className=" text-sm font-medium hover:underline hover:outline-offset-1">
                Privacy Policy
              </Link>
              <Link href="#" className=" text-sm font-medium hover:underline hover:outline-offset-1">
                FAQ
              </Link>
            </div>
          </CardContent>
        </Card>
      </footer >
    </>
  )
}