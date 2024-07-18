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
        <>
            <p>Welcome to home page</p>
            <Button onClick={() => signOut()}>
                Sign Out
            </Button>
        </>
    )
}