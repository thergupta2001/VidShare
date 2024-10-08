"use client"

import useAuth from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Loading from "./Loading";
import { trpc } from "@/server/client";
import { useEffect, useRef } from "react";
import PageLoading from "./PageLoad";

export default function HomeComponent() {
    const { status } = useAuth();

    const { data: profile } = trpc.profile.getUser.useQuery(undefined, {
        staleTime: 10 * 60 * 1000,
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status: videoStatus
    } = trpc.video.getVideos.useInfiniteQuery(
        {},
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    )

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 },
        )

        const currentTarget = observerTarget.current;

        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        }
    }, [observerTarget, fetchNextPage, hasNextPage, isFetchingNextPage])

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

            <div className="flex flex-col items-center w-full -mt-1">
                {data?.pages.map((page, i) => (
                    <div key={i} className="w-1/2">
                        {page.videos.map((video) => (
                            <div key={video.id} className="border p-4 rounded-md my-4 flex flex-col items-center">
                                <h2 className="text-xl font-semibold whitespace-nowrap">{video.title}</h2>
                                <p className="whitespace-nowrap">{video.description}</p>
                                <video
                                    src={video.url}
                                    controls
                                    className="w-full mt-2"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {isFetchingNextPage && <PageLoading />}
            <div ref={observerTarget} />

            {!hasNextPage && <p>No more videos to load.</p>}
        </div>
    )
}