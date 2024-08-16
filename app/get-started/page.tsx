import LoginForm from './LoginForm'
export default async function GetStarted() {
    return (
        <main className="h-[100dvh] w-[100dvw] flex justify-center items-center p-5">
            <LoginForm />
        </main>
    )
}