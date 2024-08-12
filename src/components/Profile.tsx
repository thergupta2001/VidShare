"use client"

import { trpc } from "@/server/client"
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ProfileComponent() {
    const profileMutation = trpc.profile.getUser.useQuery();

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="flex flex-col gap-3 p-6">
                    <Avatar
                        src={profileMutation.data?.image || ""}
                        size="lg"
                        className="w-24 h-24 text-large"
                    />
                    <div className="flex flex-col items-center text-center">
                        <p className="text-xl sm:text-2xl font-semibold">{profileMutation.data?.name}</p>
                        <p className="text-sm sm:text-base text-default-500 mt-1">{profileMutation.data?.email}</p>
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