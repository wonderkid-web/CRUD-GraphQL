import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import GraphQLWrapperAuth from "@/components/wrapper/GraphQLWrapperAuth";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Website Admin Sripa",
  description: "Sripa SMK Putra Anda Binjai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GraphQLWrapperAuth>{children}</GraphQLWrapperAuth>
      </body>
    </html>
  );
}
