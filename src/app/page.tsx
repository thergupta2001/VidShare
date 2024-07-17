"use client";

import { trpc } from "@/server/client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { increaseAtom } from "./utils/store";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const getUsers = trpc.user.getUsers.useQuery();
  const addUsers = trpc.user.addUsers.useMutation({
    onSettled: () => {
      getUsers.refetch();
    }
  });

  const [email, setEmail] = useState<string>("");
  const [count, setCount] = useRecoilState(increaseAtom);

  useEffect(() => {
    if (status === "authenticated" && !session?.user) {
      console.log("Authenticated but user object not loaded:", session);
    }
  }, [status, session]);

  if (!session) {
    return (
      <div>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Signed in as {session.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      {/* {JSON.stringify(getUsers.data)} */}
      <p onClick={() => { setCount(count + 1) }}>Hello {count}</p>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <button onClick={() => { router.replace("/test") }}>
        Test Page
      </button>
      <Button color="primary" variant="ghost">
        Click Here
      </Button>
    </div>
  );
}
