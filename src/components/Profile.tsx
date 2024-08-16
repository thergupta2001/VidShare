"use client"

import { trpc } from "@/server/client"
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import userImage from "../assets/user.jpg";
import Loading from "./Loading";

export default function ProfileComponent() {

    const { data: profile, isFetched} = trpc.profile.getUser.useQuery(undefined, {
        staleTime: 10 * 60 * 1000,
    });

    if(!isFetched) return <Loading />
    if(!profile) throw new Error("there is no profile , something went wrong");

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="flex flex-col gap-3 p-6">
                    <Avatar
                        src={profile.image! || userImage.src}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-center text-center">
                        <p className="text-xl sm:text-2xl font-semibold">{profile.name}</p>
                        <p className="text-sm sm:text-base text-default-500 mt-1">{profile.email}</p>
                    </div>
                </CardHeader>

                <Divider />

                <CardBody className="p-6">
                    <p className="text-center">Welcome to your profile!</p>
                </CardBody>
            </Card>
        </div>
    )
}