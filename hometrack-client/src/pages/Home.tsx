import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

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
            <SignedIn>
                <h1>Welcome {user?.firstName}!</h1>
            </SignedIn>

            <SignedOut>
                <h1>Please sign in</h1>
            </SignedOut>
        </>
    );
}
