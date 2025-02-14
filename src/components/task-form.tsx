'use client'

import {z} from "zod";
import {CreateTaskRequest, Priority, Status, Task} from "@/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useAddTask, useUpdateTask} from "@/hooks/useTasks";
import {toast} from "react-toastify";
import {Textarea} from "@/components/ui/text-area";


const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    priority: z.nativeEnum(Priority, { errorMap: () => ({ message: "Priority is required" }) }),
    status: z.nativeEnum(Status, { errorMap: () => ({ message: "Status is required" }) }),
    dueDate: z.string().min(1, "Due date is required").refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});

export default function TaskForm({ task }: { task?: Task }) {
    const isUpdate = !!task;

    const addMutation = useAddTask();
    const updateMutation = useUpdateTask();

    function formatDateForInput(dateString: string) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return date.toISOString().split("T")[0];
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: task
            ? {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: formatDateForInput(task.dueDate),
            }
            : {
                title: "",
                description: "",
                priority: Priority.Medium,
                status: Status.Pending,
                dueDate: "",
            },
    });

    async function onSubmit(values: CreateTaskRequest) {
        try {
            if (isUpdate && task) {
                await updateMutation.mutate({
                    id: task._id,
                    updateData: values,
                });
                toast.success("Task updated successfully");
            } else {
                await addMutation.mutate(values);
                toast.success("Task added successfully");
            }
        } catch (e) {
            toast.error("Error saving task");
        }
    }

    return(
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter task title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter task description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Priority.High}>High</SelectItem>
                                            <SelectItem value={Priority.Medium}>Medium</SelectItem>
                                            <SelectItem value={Priority.Low}>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Status.Pending}>Pending</SelectItem>
                                            <SelectItem value={Status.InProgress}>In Progress</SelectItem>
                                            <SelectItem value={Status.Completed}>Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Enter due date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isUpdate ? updateMutation.isPending : addMutation.isPending}
                    >
                        {isUpdate
                            ? (updateMutation.isPending ? "Updating Task..." : "Update Task")
                            : (addMutation.isPending ? "Adding Task..." : "Add Task")
                        }
                    </Button>

                </form>
            </Form>
        </div>
    )
}
