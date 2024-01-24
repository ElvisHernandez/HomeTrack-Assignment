import { PropsWithChildren, createContext, useState } from "react";

export type Task = {
    id: number;
    task: string;
    photo: string;
    completed: boolean;
};

type ContextData = {
    tasks: Array<Task>;
    selectedTaskPhoto: string;
    setSelectedTaskPhoto: (photo: string) => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
};

const initialContextData: ContextData = {
    tasks: [],
    selectedTaskPhoto: "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSelectedTaskPhoto: (_p: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addTask: (_t: Task) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTask: (_t: Task) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteTask: (_taskId: number) => {},
};

export const DataContext = createContext<ContextData>(initialContextData);

export let taskId = 0;

export function DataContextProvider(props: PropsWithChildren) {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [selectedTaskPhoto, setSelectedTaskPhoto] = useState("");

    const addTask = (task: Task) => {
        const newTask = { ...task, id: ++taskId };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                } else {
                    return task;
                }
            })
        );
    };

    const deleteTask = (taskId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <DataContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                selectedTaskPhoto,
                setSelectedTaskPhoto,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
