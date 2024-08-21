"use client"

import Loading from "@/components/Loading";
import ProfileComponent from "@/components/Profile";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";

export default function Profile () {
    const { session, status } = useAuth();

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <ProfileComponent />
            </div>
        </div>
    )
}