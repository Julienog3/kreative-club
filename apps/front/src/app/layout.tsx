import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import './globals.css'
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Kreative club",
  description: "Kreative club is an app"
}

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}