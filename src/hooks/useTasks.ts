import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CreateTaskRequest, CreateTaskResponse, Task} from "@/types";
import {addTask, deleteTask, getAll, updateTask} from "@/api/task";


export const useTasks = () => {
    return useQuery<{ tasks: Task[] }, Error>( {
        queryKey: ['tasks'],
        queryFn: () => getAll()
    })
}

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateTaskResponse, Error, CreateTaskRequest>( {
        mutationFn: (createTaskDto) => addTask(createTaskDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: (id) => deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { id: string; updateData: CreateTaskRequest }>({
        mutationFn: ({ id, updateData }) => updateTask(id, updateData), // Ensure the function matches this shape
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
