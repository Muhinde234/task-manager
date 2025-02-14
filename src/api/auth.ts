import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import API from "@/lib/axios";

export const login = async (userData: LoginRequest): Promise<LoginResponse> => {
    try {
        const response: AxiosResponse<LoginResponse> = await API.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}

export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try{
        const response: AxiosResponse<RegisterResponse> = await API.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}
