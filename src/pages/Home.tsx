import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { DataContext } from "../data/context";
import { Task } from "./task/Task";

export default function Home() {
    const { isLoaded, user } = useUser();
    const { tasks, selectedTaskPhoto } = useContext(DataContext);

    if (!isLoaded) {
        return (
            <div className="h-full flex justify-center items-center">
                <span className="loading loading-spinner loading-lg mt-[16px]"></span>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col h-full justify-center items-center text-[32px]">
                <SignedIn>
                    <h1>Welcome {user?.primaryEmailAddress?.emailAddress}!</h1>

                    <Link className="btn btn-primary mt-[16px]" to="/task">
                        Create a new Task
                    </Link>

                    <div className="w-[512px] text-[16px] mt-[16px]">
                        {tasks.map((task) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </div>
                </SignedIn>

                <SignedOut>
                    <h1>Please sign in to create and manage your tasks</h1>
                </SignedOut>

                <dialog id="task_photo_modal" className="modal">
                    <div className="modal-box max-w-[none]">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>

                        <img
                            src={selectedTaskPhoto}
                            alt="Photo of the current task"
                            className="p-[16px]"
                        />
                    </div>
                </dialog>
            </div>
        </>
    );
}
