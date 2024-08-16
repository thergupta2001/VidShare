"use client"

import useAuth from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Loading from "./Loading";
import { trpc } from "@/server/client";

export default function HomeComponent () {
    const { session, status } = useAuth();

    const { data: profile } = trpc.profile.getUser.useQuery(undefined, {
        staleTime: 10 * 60 * 1000,
    });

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Home</h1>
            <p>{profile?.name}</p>
            <Button onClick={() => signOut()} color="primary" variant="ghost">
                Sign Out
            </Button>
        </div>
    )
}