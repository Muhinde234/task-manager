import {useAuth} from "@/context/AuthContext";
import {useMutation} from "@tanstack/react-query";
import {LoginRequest, RegisterRequest} from "@/types";
import {login as apiLogin, register} from "@/api/auth";
import {toast} from "react-toastify";


export const useRegister = () => {
    return useMutation({
        mutationFn: async (userData: RegisterRequest) => {
            return await register(userData);
        }
    })
}

export const useLogin = () => {
    const { login } = useAuth();

    return useMutation({
        mutationFn: async (credentials:LoginRequest) => {
            const data = await apiLogin(credentials);
            const {  data:user, accessToken } = data;

            login(accessToken, user);

            return data;
        },
        onSuccess: async () => {

            toast.success("Login successful!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Login failed. Please try again.");
        },
    });
}

export const useLogout = () => {
    const { logout } = useAuth();
    logout();
}