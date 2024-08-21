import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth () {
    const pathName = usePathname();
    const router = useRouter();
    const { data : session, status } = useSession();

    useEffect(() => {
        async function auth() {
            try {
                if (status === "unauthenticated") {
                    router.replace("/")
                }
                if(status === "authenticated" && session?.user && pathName === "/") {
                    router.replace("/home");
                }
            } catch (error) {
                console.error(error);
                router.replace("/")
                alert("Internal Server Error");
            }
        }

        auth();
    }, [router, session, status, pathName])

    return { session, status };
}