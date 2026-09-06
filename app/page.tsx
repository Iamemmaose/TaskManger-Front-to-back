"use client"

import SplashScreen from "@/app/component/SplashScreen"
import { useState } from "react"
import TaskManagerPage from "@/app/Tasks/page"
export default function Home() {
    const [splashScreen, setSplashScreen] = useState(true)
    return (
        <>
            {splashScreen && (<SplashScreen onComplete={() => setSplashScreen(false)} />)}
            {!splashScreen && (
                <TaskManagerPage />
            )}
        </>
    )
}