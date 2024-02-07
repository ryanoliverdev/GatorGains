'use client'
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  // If there's a session (user is logged in), render the dashboard
  if (status === "authenticated") {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {session.user!!.email}</p>
        {/* Rest of your dashboard code */}
        <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>sign out</button>
      </div>
    );
  }
}
