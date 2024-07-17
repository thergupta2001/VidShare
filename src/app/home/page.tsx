"use client"

import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/")
        }
    }, [status, router])

    return (
        <>
            <p>Welcome to home page</p>
            <Button onClick={() => signOut()}>
                Sign Out
            </Button>
        </>
    )
}