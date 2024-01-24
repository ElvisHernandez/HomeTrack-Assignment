import { MdCancel, MdDone } from "react-icons/md";
import { DataContext, Task as TaskType } from "../data/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const completedIconStyle = (completed: boolean) => ({
    color: completed ? "green" : "yellow",
    transform: "scale(1.5)",
    marginRight: "16px",
});

export function Task(props: { task: TaskType }) {
    const { task } = props;

    const { setSelectedTaskPhoto, deleteTask } = useContext(DataContext);
    const navigate = useNavigate();

    const selectTaskPhoto = () => {
        const dialog = document?.getElementById(
            "task_photo_modal"
        ) as HTMLDialogElement;

        setSelectedTaskPhoto(task.photo);
        dialog.showModal();
    };

    return (
        <div
            className="mt-[8px] bg-secondary p-[16px] rounded-[2px]"
            key={task.id}
        >
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center">
                    {task.completed && (
                        <MdDone style={completedIconStyle(task.completed)} />
                    )}

                    {!task.completed && (
                        <MdCancel style={completedIconStyle(task.completed)} />
                    )}
                    <p>{task.task}</p>
                </div>

                <div className="mt-[16px] md:mt-0">
                    <button
                        onClick={selectTaskPhoto}
                        className="btn btn-primary mr-[8px]"
                    >
                        View Photo
                    </button>
                    <button
                        onClick={() => navigate(`/tasks/${task.id}`)}
                        className="btn btn-primary mr-[8px]"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="btn btn-error"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
