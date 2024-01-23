import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Home() {
    const { isLoaded, user } = useUser();

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
                    <h1>Welcome {user?.firstName}!</h1>

                    <Link className="btn btn-primary" to="/task">
                        Create a new Task
                    </Link>
                </SignedIn>

                <SignedOut>
                    <h1>Please sign in to create and manage your tasks</h1>
                </SignedOut>
            </div>
        </>
    );
}
