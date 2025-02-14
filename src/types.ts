
export type UserData = {
    _id: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
};

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    accessToken: string;
    data: UserData;
};

export type RegisterRequest = {
    username: string;
    phone: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    message: string;
    data: UserData;
};

export type SafeUser = {
    _id: string;
    username: string;
    phone: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}

export enum Status {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed'
}

export type CreateTaskRequest = {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    dueDate: string;
};


export type Task = {
    _id: string;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    dueDate: string;
    user: string;
    createdAt: string;
    updatedAt: string;
};


export type CreateTaskResponse = {
    task: Task;
};