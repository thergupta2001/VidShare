"use client"

import { trpc } from "@/server/client";
import { Button } from "@nextui-org/react"
import { useRef, useState } from "react"

export default function Upload() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const uploadVideo = trpc.video.uploadVideo.useMutation();

    async function handleUpload() {
        const file = fileInputRef?.current?.files?.[0];
        setError(null);
        setUploadedUrl(null);

        if (!file) {
            setError("Please select a file first!")
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            setError("File size should not be greater than 50mb!")
        }

        try {
            // Converts the file to base64
            const arrayBuffer = await file.arrayBuffer();
            const base64 = btoa(
                new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )

            const response = await uploadVideo.mutateAsync({
                name : file.name,
                type : file.type,
                size : file.size,
                base64 : base64
            });
            console.log("Upload successful:", response);
        } catch (error) {
            console.error("Upload failed:", error);
            setError("Upload failed. Please try again.");
        }
    }

    return (
        <div>
            <p>Upload Video (Max 50MB)</p>
            <input type="file" ref={fileInputRef} accept="video/*" />
            <Button onClick={handleUpload}>Upload</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {uploadedUrl && <p>Video uploaded successfully. URL: {uploadedUrl}</p>}
        </div>
    )
}