"use client"

import { trpc } from "@/server/client";
import { useState } from "react";

export default function Home() {
  const getUsers = trpc.user.getUsers.useQuery();
  const addUsers = trpc.user.addUsers.useMutation({
    onSettled: () => {
      getUsers.refetch();
    }
  });

  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(getUsers.data)}
      <p>Hello</p>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
      <button onClick={() => { addUsers.mutate({email}) }}>Submit</button>
    </div>
  );
}
