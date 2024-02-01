import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import type { ReactNode } from 'react';

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}