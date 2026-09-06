"use client"

import { useState, useEffect } from "react"

type SplashScreenProps = {
    duration?: number;
    onComplete?: () => void
}

const SplashScreen = ({ duration = 2500, onComplete }: SplashScreenProps) => {

    // const [visible, setVisible] = useState(true);
    const [hidden, setHidden] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // const visibleScreen = setTimeout(() => { setVisible(false)}, duration + 500 );
        const progressBar = setTimeout(() => {setProgress(100)}, 50)
        const hiddenScreen = setTimeout(() => { setHidden(true)}, duration );
        const completeScreen = setTimeout(() => {onComplete?.()}, duration + 500)
        return () => { clearTimeout(progressBar); clearTimeout(hiddenScreen); clearTimeout(completeScreen) };
    }, [duration, onComplete])

    // useEffect(() => {
    //     const progressBar = requestAnimationFrame(() => setProgress(100))
    //     return () => cancelAnimationFrame(progressBar)
    // }, [])

    // if (!visible) return null;


    return (
        <div className={`container mx-auto max-w-6xl px-5 fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"}`}>
            <div>
                <h1 className=" text-4xl md:text-5xl font-bold text-center uppercase">
                    Task Manager
                </h1>
            </div>
            <div className="mx-auto max-w-2xl bg-(--foreground) h-1 w-50 md:w-80 mt-40 rounded-md overflow-hidden border border-(--foreground)">
                <span className="block h-full w-full bg-(--background) " style={{ width: `${progress}%`, transition: `width ${duration}ms ease-out` }}></span>
            </div>
        </div>
    )
}

export default SplashScreen