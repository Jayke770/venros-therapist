import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CircleX, EllipsisVertical, Send } from "lucide-react"
import { cn } from "@/lib/utils"
export default function Chat(props: { isOpen?: boolean, onToggleChat?: () => void }) {
  return (
    <div className={cn(`${props?.isOpen ? "flex" : "hidden"} transition-all fixed z-50 bottom-0 md:right-5 h-screen md:h-[80vh] w-full md:w-96 bg-background`)}>
      <div className="flex flex-col w-full md:border md:rounded-t-xl shadow-lg">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-2 sm:h-[60px] sm:px-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-medium">Olivia Martin</h2>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <EllipsisVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Mute conversation</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={props?.onToggleChat} size={"icon"} variant={"ghost"} className="rounded-full">
              <CircleX className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p>{"Hey there! How's it going?"}</p>
                <div className="mt-2 text-xs text-muted-foreground">2:39 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-2 justify-end">
              <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                <p>Doing great, thanks for asking!</p>
                <div className="mt-2 text-xs text-muted-foreground">2:40 PM</div>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p>{"Awesome, let's catch up later!"}</p>
                <div className="mt-2 text-xs text-muted-foreground">2:41 PM</div>
              </div>
            </div>
          </div>
        </main>
        <div className="sticky bottom-0 bg-background px-2 py-2 sm:px-6">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[48px] w-full rounded-2xl resize-none border border-neutral-400 p-3 pr-16 shadow-sm"
            />
            <Button type="submit" variant={"ghost"} size="icon" className="absolute right-3 top-3">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}