import { MdCancel, MdDone } from "react-icons/md";
import { DataContext, Task as TaskType } from "../../data/context";
import { useContext } from "react";

const completedIconStyle = (completed: boolean) => ({
    color: completed ? "green" : "red",
    transform: "scale(1.5)",
    marginRight: "16px",
});

export function Task(props: { task: TaskType }) {
    const { task } = props;

    const { setSelectedTaskPhoto } = useContext(DataContext);

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
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {task.completed && (
                        <MdDone style={completedIconStyle(task.completed)} />
                    )}

                    {!task.completed && (
                        <MdCancel style={completedIconStyle(task.completed)} />
                    )}
                    <p>{task.task}</p>
                </div>

                <div>
                    <button
                        onClick={selectTaskPhoto}
                        className="btn btn-primary mr-[8px]"
                    >
                        View Photo
                    </button>
                    <button className="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
}
