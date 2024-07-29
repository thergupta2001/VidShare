"use client"

import { trpc } from "@/server/client";
import { Button } from "@nextui-org/react"
import { useState } from "react"

export default function Upload() {
    const [file, setFile] = useState<File | null>();
    const [title, setTitle] = useState<string>("");

    const uploadMutation = trpc.video.uploadVideo.useMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        try {
            const result = await uploadMutation.mutateAsync({
                title,
                file: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                }
            });

            // console.log(file)
            console.log(result)

            // await fetch(result.signedUrl, {
            //     method: 'PUT',
            //     body: file,
            //     headers: {
            //         'Content-Type': file.type,
            //     }
            // });

            console.log('Video uploaded successfully:', result.video);
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Video Title"
            />
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}