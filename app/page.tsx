import { cn } from "@/lib/utils"
import { MenuIcon, Sparkles } from "lucide-react"
import Image from 'next/image'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default async function Home() {
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
            <Link href="/" className="mr-6 hidden lg:flex">
              <Sparkles className="h-6 w-6" />
              <span className="sr-only">Company</span>
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
          <Sparkles className="h-6 w-6" />
          <span className="sr-only">Company</span>
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
        <Button className={cn("ml-4")} size={"sm"} asChild>
          <Link href={"/get-started"}>
            Get Started
          </Link>
        </Button>
      </header>
      <main className="lg:grid lg:grid-cols-2 h-[calc(100dvh-4rem)] w-[100dvw]">
        <div className=" h-full w-full flex pt-16  lg:pt-0 justify-center lg:items-center py-4 px-5 lg:px-28 ">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center lg:text-left">Your Best Value Proposition</h1>
              <p className="text-center lg:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Button</p>
            </div>
            <Button className={cn("w-40 mt-3 self-center lg:self-start ")} asChild>
              <Link href={"/home"}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
        <div className="h-full w-full hidden lg:flex justify-center items-center">
          <div>
            <div className="h-full w-full">
              <Image
                alt="doctors"
                width={500}
                height={500}
                priority
                className=" lg:h-80"
                src={"/assets/images/doctors.svg"} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}