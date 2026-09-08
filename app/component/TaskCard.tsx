import type { Task } from "../type/tasktype";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type TaskCardProps = {
    task: Task;
    onToggle: (id: string, nextCompleted: boolean) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TaskCard({
    task,
    onToggle,
    onEdit,
    onDelete,
}: TaskCardProps) {
    return (
        <div className="bg-(--foreground) text-(--background) w-full p-5 rounded-md flex justify-between items-center">

            <div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => { onToggle(task.id, e.target.checked)}}
                   className="w-4 h-4 accent-(--background) mr-2 cursor-pointer"
                />

                <span className={task.completed ? "line-through" : ""}>
                    {task.task}
                </span>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => onEdit(task.id)}
                    aria-label="Edit task"
                >
                    <FiEdit />
                </button>

                <button
                    onClick={() => onDelete(task.id)}
                    aria-label="Delete task"
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}