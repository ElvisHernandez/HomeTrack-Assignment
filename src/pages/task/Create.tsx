import { FormEvent, useContext, useState } from "react";
import { TaskForm } from "../../components/TaskForm";
import { DataContext, Task } from "../../data/context";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const { addTask } = useContext(DataContext);
    const navigate = useNavigate();

    const [task, setTask] = useState<Task>({
        id: 0,
        task: "",
        completed: false,
        photo: "",
    });
    const [taskErrors, setTaskErrors] = useState({
        task: "",
        photo: "",
    });

    const updateTask = (
        taskPropName: keyof typeof task,
        taskPropVal: string | number | boolean
    ) =>
        setTask((prev) => ({
            ...prev,
            [taskPropName]: taskPropVal,
        }));

    const updateTaskError = (
        taskError: keyof typeof taskErrors,
        taskErrorMsg: string | number | boolean
    ) =>
        setTaskErrors((prev) => ({
            ...prev,
            [taskError]: taskErrorMsg,
        }));

    const validate = () => {
        let taskHasError = false;

        if (!task.task) {
            const errMsg = "Task cannot be empty";
            updateTaskError("task", errMsg);
            taskHasError = true;
        } else {
            updateTaskError("task", "");
        }

        if (taskHasError) {
            throw "Task has error(s)";
        } else {
            setTaskErrors({ task: "", photo: "" });
        }
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        try {
            validate();
            addTask(task);
            navigate("/");
        } catch (e) {}
    };

    return (
        <>
            <h1 className="mb-[32px] text-[32px]">Create your new Task</h1>
            <TaskForm
                task={task}
                taskErrors={taskErrors}
                changeHandler={updateTask}
                submitHandler={onSubmit}
            />
        </>
    );
}
