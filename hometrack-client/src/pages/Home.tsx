import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

export default function Home() {
    const { user } = useUser();
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
