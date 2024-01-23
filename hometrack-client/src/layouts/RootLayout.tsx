import { ClerkProvider } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Header />
            <div>
                <Outlet />
            </div>
            <footer>My Footer</footer>
        </ClerkProvider>
    );
}

function Header() {
    return (
        <div className="navbar bg-base-100 bg-secondary">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    HomeTrack Assignment
                </Link>
            </div>
            <div className="flex-none gap-2">
                <Link to="/signin">Sign in</Link>
                <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
}
