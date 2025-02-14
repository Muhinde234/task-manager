import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/wrapper";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'Loogin page',
    description: 'My Todo app login page'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Wrapper>
            {children}
        </Wrapper>
      </body>
    </html>
  );
}
