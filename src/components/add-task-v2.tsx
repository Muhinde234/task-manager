import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import AddTaskForm from "@/components/task-form";
import {Button} from "@/components/ui/button";

export default function AddTaskV2() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add new task</Button>
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
