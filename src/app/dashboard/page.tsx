'use client'

import {withAuth} from "@/components/with-auth";
import {useTasks} from "@/hooks/useTasks";
import {Skeleton} from "@/components/ui/skeleton";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {TriangleAlert} from "lucide-react";
import AddTask from "@/components/add-task";
import AddTaskV2 from "@/components/add-task-v2";
import TaskCard from "@/components/task-card";
import {Task} from "@/types";

const Dashboard = () => {
    const { data, isPending, error } = useTasks();

    if (isPending) {
        return (
            <div className="space-y-4 p-4">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[70%]" />
            </div>
        );
    }


    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <TriangleAlert size={24} />
                <AlertTitle>Error loading tasks</AlertTitle>
                <AlertDescription>
                    {error.message || 'Failed to fetch tasks. Please try again later.'}
                </AlertDescription>
            </Alert>
        );
    }

    const hasTasks = data?.tasks?.length > 0;

    return (
        <div className="container mx-auto p-4">
            {
                hasTasks && (
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            {/*<TaskIcon className="h-6 w-6"/>*/}
                            Your Tasks
                        </h1>
                        <AddTaskV2/>
                    </div>
                )
            }

            {hasTasks ? (
                <ul className="space-y-2">
                    {data.tasks.map((task, idx) => (
                        <li key={idx}>
                            <TaskCard task={task as Task} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-4 text-center flex flex-col items-center">
                    <p className="text-muted-foreground mb-5">
                        No tasks found. Start by creating a new task!
                    </p>
                    <AddTask />
                </div>
            )}
        </div>
    )
}

export default withAuth(Dashboard)