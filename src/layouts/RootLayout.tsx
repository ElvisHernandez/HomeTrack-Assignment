import { ClerkProvider, UserButton, useUser } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";
import { footerHeight, headerNavHeight } from "../constants";
import { DataContextProvider } from "../data/context";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <DataContextProvider>
                <div className="h-screen">
                    <Header />
                    <div
                        style={{
                            height: `calc(100vh - ${headerNavHeight} - ${footerHeight})`,
                        }}
                    >
                        <Outlet />
                    </div>
                    <footer
                        style={{
                            position: "fixed",
                            bottom: 0,
                            height: footerHeight,
                        }}
                    >
                        My Footer
                    </footer>
                </div>
            </DataContextProvider>
        </ClerkProvider>
    );
}

function Header() {
    const { isLoaded, isSignedIn } = useUser();
    return (
        <div
            className="navbar bg-secondary"
            style={{ height: headerNavHeight }}
        >
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    HomeTrack Assignment
                </Link>
            </div>

            <div className="flex-none gap-2">
                {isLoaded && !isSignedIn && (
                    <>
                        <Link className="btn btn-accent" to="/signin">
                            Sign in
                        </Link>
                        <Link className="btn btn-accent" to="/signup">
                            Sign up
                        </Link>
                    </>
                )}

                {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
            </div>
        </div>
    );
}
