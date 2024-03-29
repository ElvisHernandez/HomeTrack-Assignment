import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthenticatedLayout() {
    const navigate = useNavigate();
    const { isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/");
        }
    }, [isLoaded, isSignedIn, navigate]);

    if (!isSignedIn) return null;

    return (
        <>
            <Outlet />
        </>
    );
}
