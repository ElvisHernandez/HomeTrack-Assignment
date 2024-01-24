import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { footerHeight, headerNavHeight } from "../constants";
import { DataContextProvider } from "../data/context";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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

                    <Footer />
                </div>
            </DataContextProvider>
        </ClerkProvider>
    );
}
