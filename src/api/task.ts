import {CreateTaskRequest, CreateTaskResponse, LoginRequest, LoginResponse, Task} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import API from "@/lib/axios";


export const addTask = async (taskData: CreateTaskRequest): Promise<CreateTaskResponse> => {
    try {
        const response: AxiosResponse<CreateTaskResponse> = await API.post("/tasks", taskData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Adding task failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}

export const getAll = async () => {
    try {
        const response = await API.get("/tasks");
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Getting tasks failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}

export const deleteTask = async (id: string) => {
    try {
        await API.delete(`/tasks/${id}`);
    }catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Deleting task failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}