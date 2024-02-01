"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const {data: session} = useSession();

  return (
    <div>
      <Head>
        <title>App - Login Test</title>
        <meta name="description" content="Test login functionality with NextAuth" />
      </Head>

      <main>
        <h1>Welcome to the App Page</h1>
        {!session ? (
          <>
            <p>Not signed in</p>
            <button onClick={() => signIn("google")}> Sign in with Google </button>
          </>
        ) : (
          <>
            <p>
              Signed in as {session.user?.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </p>
          </>
        )}
      </main>
    </div>
  );
}
