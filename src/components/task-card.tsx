'use client'

import Badge from "@/components/ui/badge";
import {SquarePen, Trash2} from "lucide-react";
import {Task} from "@/types";
import {useDeleteTask} from "@/hooks/useTasks";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TaskCard({task}: {task: Task}) {

    const deleteTaskMutation = useDeleteTask();

    const handleDelete = () => {
        deleteTaskMutation.mutate(task._id);
    };

    return (
        <div
            key={task._id}
            className="p-4 border rounded-lg hover:bg-accent transition-colors flex items-center justify-between gap-4"
        >
            <div>
                <h3 className="font-medium">{task.title}</h3>
                {task.description && (
                    <p className="text-muted-foreground text-sm mt-1">
                        {task.description}
                    </p>
                )}
                <div className="flex items-center gap-2 text-[12px] mt-2">
                    <Badge label={task.priority} type="priority"/>
                    <Badge label={task.status} type="status"/>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DeleteModal onclick={handleDelete} />
                <button>
                    <SquarePen/>
                </button>
            </div>
        </div>
    )
}

const DeleteModal = ({onclick} : {onclick: () => void}) => {
    return(
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this task.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90" onClick={onclick}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}