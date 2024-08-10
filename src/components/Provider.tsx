"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "@/server/client"
import { httpBatchLink, loggerLink } from "@trpc/client"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react"

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(
        () =>
            trpc.createClient({
                links: [
                    loggerLink({
                        enabled: (opts) =>
                            process.env.NODE_ENV === 'development' ||
                            (opts.direction === 'down' && opts.result instanceof Error),
                    }),
                    httpBatchLink({
                        url: "http://localhost:3000/api/trpc",
                    }),
                ],
            })
    )

    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        (window as any).trpc = trpc;
    }

    return (
        <RecoilRoot>
            <NextUIProvider>
                <main className="dark text-foreground bg-background h-screen">
                    <SessionProvider>
                        <trpc.Provider client={trpcClient} queryClient={queryClient}>
                            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                        </trpc.Provider>
                    </SessionProvider>
                </main>
            </NextUIProvider>
        </RecoilRoot>
    )
}
