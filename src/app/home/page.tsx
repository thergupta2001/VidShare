"use client"

import Home from "@/components/Home";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-4 overflow-y-auto">
                <Home />
            </main>
        </div>
    )
}