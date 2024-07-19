"use client"

import Home from "@/components/Home";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 overflow-auto">
                <Home />
            </main>
        </div>
    )
}