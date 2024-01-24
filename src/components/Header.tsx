import { UserButton, useUser } from "@clerk/clerk-react";
import { headerNavHeight } from "../constants";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

export function Header() {
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
