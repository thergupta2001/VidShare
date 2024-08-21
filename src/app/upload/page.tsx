
"use client"

import Sidebar from "@/components/Sidebar"
import Upload from "@/components/Upload";

export default function UploadPage () {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-4 overflow-y-auto">
                <Upload />
            </main>
        </div>
    )
}