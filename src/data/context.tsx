import { PropsWithChildren, createContext, useState } from "react";

export type Task = {
    id: number;
    task: string;
    photo: string;
    completed: boolean;
};

type ContextData = {
    tasks: Array<Task>;
    addTask: (task: Task) => void;
};

const initialContextData: ContextData = {
    tasks: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addTask: (_t: Task) => {},
};

export const DataContext = createContext<ContextData>(initialContextData);

export let taskId = 0;

export function DataContextProvider(props: PropsWithChildren) {
    const [tasks, setTasks] = useState<Array<Task>>([]);

    const addTask = (task: Task) => {
        const newTask = { ...task, id: ++taskId };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <DataContext.Provider value={{ tasks, addTask }}>
            {props.children}
        </DataContext.Provider>
    );
}