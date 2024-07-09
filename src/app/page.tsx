"use client"

import { trpc } from "@/server/client";

export default function Home() {
  const getUsers = trpc.user.getUsers.useQuery();
  // console.log(getUsers)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(getUsers.data)}
      <p>Hello</p>
    </main>
  );
}
