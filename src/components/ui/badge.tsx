import React from "react";
import {cn} from "@/lib/utils";

type BadgeProps = {
    label: string;
    type: "priority" | "status";
};

const Badge: React.FC<BadgeProps> = ({ label, type }) => {
    const badgeClass = cn(
        "px-2 py-1 rounded text-white font-medium",
        type === "priority" && {
            "bg-red-500": label === "High",
            "bg-yellow-500": label === "Medium",
            "bg-green-500": label === "Low",
        },
        type === "status" && {
            "bg-gray-500": label === "Pending",
            "bg-blue-500": label === "In Progress",
            "bg-green-500": label === "Completed",
        }
    );

    return <span className={badgeClass}>{label}</span>;
};

export default Badge;