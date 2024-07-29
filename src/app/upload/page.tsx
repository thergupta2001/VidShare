
"use client"

import Sidebar from "@/components/Sidebar"
import Upload from "@/components/Upload";

export default function UploadPage () {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 overflow-auto">
                <Upload />
            </main>
        </div>
    )
}