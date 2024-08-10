"use client"

import { trpc } from "@/server/client";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea
} from "@nextui-org/react";
import { useRef, useState } from "react"

export default function Upload() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const uploadVideoMutation = trpc.video.uploadVideo.useMutation({
        onError: (error) => {
            setMessage(error.message);
            setIsModalOpen(true);
        },
        onSuccess: (data) => {
            setMessage("Video uploaded successfully!");
            setIsModalOpen(true);
        }
    });

    async function handleUpload() {
        const file = fileInputRef?.current?.files?.[0];
        setMessage(null);

        if (!file) {
            setMessage("Please select a file first!")
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            setMessage("File size should not be greater than 50mb!")
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const base64 = btoa(
                new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )

            await uploadVideoMutation.mutateAsync({
                name: file.name,
                type: file.type,
                size: file.size,
                base64: base64,
                title: title,
                description: description
            });
        } catch (error) {
            setMessage("Upload failed. Please try again.");
        }
    }

    return (
        <>
            <Card className="max-w-lg mx-auto mt-10">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-2xl">Upload Video</p>
                        <p className="text-small text-default-500">File size should be lesser than 50MB</p>
                    </div>
                </CardHeader>

                <CardBody>
                    <Input
                        label="Video Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4"
                    />
                    <Textarea
                        label="Video Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4"
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="video/*"
                        className="mb-4 w-full p-2 border border-secondary-300 rounded"
                    />
                </CardBody>
                <CardFooter>
                    <Button
                        onClick={handleUpload}
                        color="primary"
                        variant="ghost"
                        className="w-full"
                        disabled={uploadVideoMutation.isPending}
                    >
                        {uploadVideoMutation.isPending ? "Uploading..." : "Upload"}
                    </Button>
                </CardFooter>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="bg-gray-800">
                <ModalContent>
                    <ModalHeader className="text-white">Upload Status</ModalHeader>
                    <ModalBody className="text-white">{message}</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}