import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, Task } from "../../data/context";
import { TaskForm } from "../../components/TaskForm";

export default function Update() {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const { tasks, updateTask } = useContext(DataContext);

    const task = tasks.find((task) => task.id === +(taskId as string));

    const [taskClone, setTaskClone] = useState<Task>(task!);

    const [taskErrors, setTaskErrors] = useState({
        task: "",
        photo: "",
    });

    useEffect(() => {
        if (!taskId || !task) {
            navigate("/", { replace: true });
        }
    }, [navigate, task, taskId]);

    if (!task) {
        return null;
    }

    const updateTaskClone = (
        taskPropName: keyof Task,
        taskPropVal: string | number | boolean
    ) =>
        setTaskClone((prev) => ({
            ...prev,
            [taskPropName]: taskPropVal,
        }));

    const updateTaskError = (
        taskError: keyof typeof taskErrors,
        taskErrorMsg: string
    ) =>
        setTaskErrors((prev) => ({
            ...prev,
            [taskError]: taskErrorMsg,
        }));

    const validateTaskClone = () => {
        let taskHasError = false;

        if (!taskClone.task) {
            const errMsg = "Task cannot be empty";
            updateTaskError("task", errMsg);
            taskHasError = true;
        } else {
            updateTaskError("task", "");
        }

        if (taskHasError) {
            throw "Task has error";
        } else {
            setTaskErrors({ task: "", photo: "" });
        }
    };

    const mergeTaskClone = (e: FormEvent) => {
        e.preventDefault();
        try {
            validateTaskClone();
            updateTask(taskClone);
            navigate("/");
        } catch (e) {}
    };

    return (
        <>
            <h1 className="mb-[32px] text-[32px]">Update your Task!</h1>
            <TaskForm
                task={taskClone}
                taskErrors={taskErrors}
                changeHandler={updateTaskClone}
                submitHandler={mergeTaskClone}
            />
        </>
    );
}
