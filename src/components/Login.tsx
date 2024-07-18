"use client"

import useAuth from "@/hooks/useAuth";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Login() {
    const { session, status } = useAuth();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(true)
    }, [])

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <p className="mb-2 text-4xl font-semibold">VidShare</p>
            <div className="bg-white mb-5 py-0.5 w-10"></div>
            <p className="text-xl mb-5">Share all your videos in one place!!</p>
            <Card
                isFooterBlurred
                radius="lg"
                className={`border-none w-full max-w-sm transition-all duration-2000 ease-bounce-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="aspect-w-1 aspect-h-1 w-full">
                    <Image
                        alt="Woman listening to music"
                        className="object-cover w-full h-full"
                        src="https://imgs.search.brave.com/01VBBCJxYbyQBAuFLrY3lPPkKLqEP3RRwin9oISBD0s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC9ZTmdWdlRC/LmpwZw"
                    />
                </div>
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-white/80 w-1/2">Join Now!</p>
                    <Button
                        className="text-tiny text-white bg-black/20 w-1/2"
                        variant="ghost"
                        color="default"
                        radius="lg"
                        size="sm"
                        onClick={() => { signIn("google") }}
                    >
                        Log In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}