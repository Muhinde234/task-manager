import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import AddTaskForm from "@/components/add-task-form";

export default function AddTask() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <button className="transform hover:scale-110 transition-transform duration-300">
                    <Plus size={86} opacity={0.8}/>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <h3 className="text-2xl font-medium">Add task</h3>
                    </DialogTitle>
                </DialogHeader>
                <AddTaskForm />
            </DialogContent>
        </Dialog>
    )
}