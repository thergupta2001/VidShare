"use client"

import Loading from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";

export default function Profile () {
    const { session, status } = useAuth();

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 overflow-auto">
                Profile
            </main>
        </div>
    )
}