import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PageNotExists from "./pages/PageNotExists.tsx";
import Signin from "./pages/auth/Signin.tsx";
import Signup from "./pages/auth/Signup.tsx";

import "../static/output.css";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <PageNotExists />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/signin",
                element: <Signin />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                element: <AuthenticatedLayout />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
