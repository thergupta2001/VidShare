import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = async (req : Request) => {
    const response = await fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: () => ({}),
    });
    return new Response(response.body, {
        status: response.status,
        headers: response.headers,
    });
}

export { handler as GET, handler as POST }