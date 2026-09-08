"use client"

import { useState, useEffect } from "react"
import type { Task } from "../type/tasktype";
import TaskCard from "../component/TaskCard";
import { useRouter } from "next/navigation";

const TaskManagerPage = () => {
    const [taskData, setTask] = useState({
        task: "",
        complete: false
    })
    const [tasks, setTasks] = useState<Task[]>([])
    const Router = useRouter();


    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, [])


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!taskData.task.trim()) return;

        const existingTask = JSON.parse(localStorage.getItem("tasks") || "[]")

        const newUpdate: Task = {
            id: crypto.randomUUID(),
            task: taskData.task,
            completed: taskData.complete
        }

        localStorage.setItem("tasks", JSON.stringify([newUpdate, ...existingTask]));
        setTasks([newUpdate, ...existingTask]);
        setTask({
            task: "",
            complete: false
        });
    }

    function handleDelete(id: string) {
        const updated = tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updated));
        setTasks(updated);
    }

    function handleToggle(id: string, nextCompleted: boolean) {
        const updated = tasks.map((task) =>
            task.id === id ? { ...task, completed: nextCompleted } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updated));
        setTasks(updated);
    }

    function handleEdit(id: string) {
        Router.push(`/edit/${id}`);
    }

    return (
        <div className="flex flex-col items-center  min-h-screen bg-(--background) text-(--foreground) mx-auto max-w-6xl w-full mt-20">
            <div className=" max-w-lg w-full">
                <div className="bg-(--foreground) text-(--background) w-full p-5 rounded-md ">
                    <h1 className=" flex flex-col items-center justify-center text-1xl md:text-2xl font-bold text-center uppercase mb-5 ">Task Manager</h1>
                    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4 w-full">
                        <div className="border border-(--background) p-2 rounded-md basis-[80%]">
                            <input type="text" placeholder="e.g wash dish" value={taskData.task} onChange={(e) => setTask({ ...taskData, task: e.target.value })} className="text-(--background) placeholder:text-(--muted-foreground) focus:outline-none" />
                        </div>
                        <div className="basis-[20%]">
                            <input type="submit" value="Add Task" className="bg-(--background) text-(--foreground) px-5 py-2 rounded-md cursor-pointer hover:translate-y-0.5 transition-transform duration-200" />
                        </div>
                    </form>

                </div>

                <div className="w-full p-5 mt-5 flex flex-col gap-2">
                    {tasks.map((task) => (
                        <article key={task.id}>
                            <TaskCard task={task} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit} />
                        </article>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TaskManagerPage