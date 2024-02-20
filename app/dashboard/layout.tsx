import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "../globals.css";
import WrapNextTheme from "../components/WrapNextTheme";
import WrapNextUI from "../components/WrapNextUI";
import WrapRainbowkit from "../components/WrapRainbowKit";

// const inter = Inter({ subsets: ["latin"] });
const open = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blackdit | miniproject",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WrapNextTheme>
        <WrapRainbowkit>
          <WrapNextUI>
            <body className={open.className}>
              <main className="light text-foreground bg-background">
                {children}
              </main>
            </body>
          </WrapNextUI>
        </WrapRainbowkit>
      </WrapNextTheme>
    </html>
  );
}
