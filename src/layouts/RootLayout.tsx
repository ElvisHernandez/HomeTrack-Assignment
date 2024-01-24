import { ClerkProvider, UserButton, useUser } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";
import { footerHeight, headerNavHeight } from "../constants";
import { DataContextProvider } from "../data/context";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

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
                        className="flex flex-col justify-center items-center mb-[32px]"
                        style={{
                            minHeight: `calc(100vh - ${headerNavHeight} - ${footerHeight} - 32px)`,
                        }}
                    >
                        <Outlet />
                    </div>
                    <footer
                        className="flex justify-end items-center static bottom-0 bg-secondary p-[16px]"
                        style={{
                            height: footerHeight,
                        }}
                    >
                        <a
                            href="https://www.linkedin.com/in/elvis-hernandez-dev/"
                            target="_blank"
                            className="mr-[24px]"
                        >
                            <FaLinkedin className="scale-[2]" />
                        </a>
                        <a
                            href="https://github.com/ElvisHernandez/HomeTrack-Assignment"
                            target="_blank"
                        >
                            <FaGithub className="scale-[2]" />
                        </a>
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

            <div className="hidden md:block">
                {isLoaded && !isSignedIn && (
                    <>
                        <Link className="btn btn-accent mr-[8px]" to="/signin">
                            Sign in
                        </Link>
                        <Link className="btn btn-accent" to="/signup">
                            Sign up
                        </Link>
                    </>
                )}

                {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
            </div>

            <div className="block md:hidden">
                {isLoaded && !isSignedIn && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <RxHamburgerMenu className="scale-[1.5] mr-[8px]" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link
                                    className="flex justify-center text-accent"
                                    to="/signin"
                                >
                                    Sign in
                                </Link>{" "}
                            </li>
                            <li>
                                <Link
                                    className="flex justify-center text-accent"
                                    to="/signup"
                                >
                                    Sign up
                                </Link>{" "}
                            </li>
                        </ul>
                    </div>
                )}

                {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
            </div>
        </div>
    );
}
