"use client"

import { useState } from "react"

const TaskManagerPage = () => {
    const [task, setTask] = useState("")

    return (
        <div className="flex flex-col items-center  min-h-screen bg-(--background) text-(--foreground) mx-auto max-w-6xl w-full mt-20">
            <div className=" max-w-lg w-full">
                <div className="bg-(--foreground) text-(--background) w-full p-5 rounded-md ">
                    <h1 className=" flex flex-col items-center justify-center text-1xl md:text-2xl font-bold text-center uppercase mb-5 ">Task Manager</h1>
                    <form className="flex items-center justify-center gap-4 w-full">
                        <div className="border border-(--background) p-2 rounded-md basis-[80%]">
                            <input type="text" placeholder="e.g wash dish" value={task} onChange={(e) => setTask(e.target.value)} />
                        </div>
                        <div className= "basis-[20%]">
                            <input type="submit" value="Add Task" className="bg-(--background) text-(--foreground) px-5 py-2 rounded-md cursor-pointer hover:translate-y-0.5 transition-transform duration-200" />
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default TaskManagerPage