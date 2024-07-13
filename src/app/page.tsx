"use client"

import { trpc } from "@/server/client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data : session } = useSession();
  const getUsers = trpc.user.getUsers.useQuery();
  const addUsers = trpc.user.addUsers.useMutation({
    onSettled: () => {
      getUsers.refetch();
    }
  });

  const [email, setEmail] = useState<string>("");

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
      {JSON.stringify(getUsers.data)}
      <p>Hello</p>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
      <button onClick={() => { addUsers.mutate({email}) }}>Submit</button>
    </div>
  );
}
