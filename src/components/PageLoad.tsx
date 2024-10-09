import { Spinner } from "@nextui-org/react"

export default function PageLoading() {
    return (
        <>
            <div className="flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        </>
    )
}