'use client'

import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "@/context/AuthContext";

const queryClient = new QueryClient();


export default function Wrapper({children}:{children: ReactNode}) {
    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastContainer position="top-center" />
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}