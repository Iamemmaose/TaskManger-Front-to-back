"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Task } from "@/app/type/tasktype";

export default function EditTaskPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [taskData, setTaskData] = useState({
        task: "",
        complete: false
    });

    useEffect(() => {
        const saved: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
        const current = saved.find((t) => t.id === id);
        if (current) {
            setTaskData({ task: current.task, complete: current.completed });
        }
    }, [id]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!taskData.task.trim()) return;

        const saved: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = saved.map((t) =>
            t.id === id ? { ...t, task: taskData.task, completed: taskData.complete } : t
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        router.push("/");
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-(--background) text-(--foreground) mx-auto max-w-6xl w-full mt-20">
            <div className="max-w-lg w-full">
                <div className="bg-(--foreground) text-(--background) w-full p-5 rounded-md">
                    <h1 className="text-1xl md:text-2xl font-bold text-center uppercase mb-5">
                        Edit Task
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="border border-(--background) p-2 rounded-md">
                            <label htmlFor="task" className="sr-only">Task</label>
                            <input
                                id="task"
                                type="text"
                                value={taskData.task}
                                onChange={(e) => setTaskData({ ...taskData, task: e.target.value })}
                                className="w-full text-(--background) placeholder:text-(--muted-foreground) focus:outline-none"
                            />
                        </div>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={taskData.complete}
                                onChange={(e) => setTaskData({ ...taskData, complete: e.target.checked })}
                                className="bg-(--background) border border-(--foreground) rounded-md"
                            />
                            Completed
                        </label>

                        <input
                            type="submit"
                            value="Update Task"
                            className="bg-(--background) text-(--foreground) px-5 py-2 rounded-md cursor-pointer hover:translate-y-0.5 transition-transform duration-200"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}