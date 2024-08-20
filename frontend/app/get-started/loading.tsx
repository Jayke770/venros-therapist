import { Loader2 } from "lucide-react"
export default function Loading() {
    return (
        <main className="h-[100dvh] w-[100dvw] flex justify-center items-center p-5">
            <Loader2 className=" h-12 w-12 animate-spin" />
        </main>
    )
}