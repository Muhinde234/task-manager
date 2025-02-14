'use client'

import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useAuth} from "@/context/AuthContext";
import {CircleUserRound} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    const {user, logout} = useAuth();
    return(
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[600px] min-h-96">
                <CardHeader>
                    <CardTitle className="capitalize flex items-center justify-between">
                        <h2>
                            {user?.username}
                        </h2>
                        <Popover>
                            <PopoverTrigger>
                                <CircleUserRound/>
                                <PopoverContent className="w-40">
                                    <button onClick={logout} className="font-medium">Logout</button>
                                </PopoverContent>
                            </PopoverTrigger>
                        </Popover>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter className="text-gray-400 text-sm">
                    <p>Igirimpuhwe Dositha</p>
                </CardFooter>
            </Card>
        </div>
    )
}