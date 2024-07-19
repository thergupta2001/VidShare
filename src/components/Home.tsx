"use client"

import useAuth from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Loading from "./Loading";

export default function Home() {
    const { session, status } = useAuth();

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Home</h1>
            <Button onClick={() => signOut()} color="primary" variant="ghost">
                Sign Out
            </Button>
        </div>
    )
}