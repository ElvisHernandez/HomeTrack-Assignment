import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DataContext, Task } from "../data/context";

type TaskFormProps = {
    task: Task;
    taskErrors: { task: string; photo: string };
    changeHandler: (
        inputName: keyof Task,
        inputVal: string | number | boolean
    ) => void;
    submitHandler: (e: FormEvent) => void;
};

export function TaskForm(props: TaskFormProps) {
    const { task, taskErrors, changeHandler, submitHandler } = props;

    const [presubmitError, setPresubmitError] = useState("");

    const { tasks } = useContext(DataContext);

    // We'll use the existence of the task to determine wether this is a Create or Update form instance
    const taskExists = () => !!tasks.find((t) => t.id === task.id);

    const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const [photoFile] = e.target.files;

        // dont allow files greater than a 5MB
        if (photoFile.size > 5_000_000) {
            setPresubmitError("Photo is not allowed to exceed to 5MB");
            cleanupPresubmitErrorMsg();
            return;
        }

        const allowedPhotoExtensions = [".png", ".jpeg", ".jpg"];

        const hasForbiddenExtension = allowedPhotoExtensions.every(
            (ext) => !photoFile.name.toLocaleLowerCase().includes(ext)
        );

        if (hasForbiddenExtension) {
            setPresubmitError("Only JPEG or PNG photos are allowed");
            cleanupPresubmitErrorMsg();
            return;
        }

        const url = URL.createObjectURL(photoFile);

        changeHandler("photo", url);
    };

    const cleanupPresubmitErrorMsg = () =>
        setTimeout(() => setPresubmitError(""), 5000);

    return (
        <form onSubmit={submitHandler} className="w-[256px] md:w-[512px]">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Enter your task(*)</span>
                </div>
                <input
                    type="text"
                    placeholder="Go grocery shopping..."
                    value={task.task}
                    onChange={(e) => changeHandler("task", e.target.value)}
                    className="input input-bordered w-full"
                    style={{
                        border: taskErrors.task ? "1px solid red" : "",
                    }}
                />
            </label>

            {!!taskErrors.task && (
                <span className="text-red-500 mt-[16px]">
                    {taskErrors.task}
                </span>
            )}

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">
                        Upload Task Photo (optional)
                    </span>
                </div>
                <input
                    type="file"
                    onChange={onPhotoChange}
                    className="file-input file-input-bordered file-input-secondary w-full"
                />
            </label>

            {!!task.photo && (
                <img
                    src={task.photo}
                    alt="A photo related to the current task"
                />
            )}

            <div className="form-control mt-[8px]">
                <label className="cursor-pointer label">
                    <span className="label-text">Task Complete?</span>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                            changeHandler("completed", !task.completed)
                        }
                        className="checkbox checkbox-primary"
                    />
                </label>
            </div>

            <div className="flex justify-center mt-[16px]">
                <button className="btn btn-success">
                    {taskExists() ? "Update Task" : "Create Task"}
                </button>
            </div>

            {!!presubmitError && (
                <div
                    role="alert"
                    className="absolute w-fit top-[80px] right-[16px] alert alert-error"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{presubmitError}</span>
                </div>
            )}
        </form>
    );
}
