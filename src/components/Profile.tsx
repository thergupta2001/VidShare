"use client"

import { trpc } from "@/server/client"
import {
    Avatar, 
    Button, 
    Card, 
    CardBody, 
    CardHeader, 
    Divider, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalFooter, 
    ModalHeader 
} from "@nextui-org/react";
import userImage from "../assets/user.jpg";
import Loading from "./Loading";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function ProfileComponent() {

    const { data: profile, isFetched } = trpc.profile.getUser.useQuery(undefined, {
        staleTime: 10 * 60 * 1000,
    });

    const [message, setMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isFetched) return <Loading />
    if (!profile) {
        setMessage("Profile not found.");
        setIsModalOpen(true);
        throw new Error("Profile not found");
    }

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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="bg-gray-800">
                <ModalContent>
                    <ModalHeader className="text-white">Upload Status</ModalHeader>
                    <ModalBody className="text-white">{message}</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            setIsModalOpen(false);
                            signOut();
                        }}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}