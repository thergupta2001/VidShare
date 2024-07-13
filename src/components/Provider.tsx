"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "@/server/client"
import { httpBatchLink } from "@trpc/client"
import { SessionProvider } from "next-auth/react"

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(
        () =>
            trpc.createClient({
                links: [
                    httpBatchLink({
                        url: "http://localhost:3000/api/trpc",
                    }),
                ],
            })
    )

    return (
        <SessionProvider>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </trpc.Provider>
        </SessionProvider>
    )
}
