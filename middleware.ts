export { auth as middleware } from "@/lib/auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    unstable_allowDynamic: ["/node_modules/mongoose/dist/*"],
}