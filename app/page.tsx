import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import Image from 'next/image'
export default async function Home() {
  return (
    <>
      <header>
        <nav className="px-5 lg:px-24 py-4">
          <Button variant={"ghost"}>
            <Sparkles className=" mr-4" /> Company
          </Button>
        </nav>
      </header>
      <main className="lg:grid lg:grid-cols-2 h-[100dvh] w-[100dvw]">
        <div className=" h-full w-full flex pt-16  lg:pt-0 justify-center lg:items-center py-4 px-5 lg:px-24">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center lg:text-left">Your Best Value Proposition</h1>
              <p className="text-center lg:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Button</p>
            </div>
            <Button className={cn("w-40 mt-3 self-center lg:self-start ")}>Book Now</Button>
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
                className=" lg:h-96"
                src={"/assets/images/doctors.svg"} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}