"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
export const ThemeSwitch = () => {
    const { setTheme, theme, systemTheme } = useTheme()
    return (
        <div role="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Theme: {theme}
        </div>
    )
}