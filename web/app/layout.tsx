import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { EvmWalletSelectorContextController } from "@/context/evm/wallet-selector/EvmWalletSelectorContextController";
import { TodosContextController } from "@/context/todos/TodosContextController";
import { EvmSignatureVerificationContextController } from "@/context/evm/evm-signature-verification/EvmSignatureVerificationContextController";
import { Erc20ContextController } from "@/context/evm/erc20/Erc20ContextController";
import { headers } from "next/headers";
import { Erc721ContextController } from "@/context/evm/erc721/Erc721ContextController";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <EvmWalletSelectorContextController cookies={cookies}>
          <EvmSignatureVerificationContextController>
            <Erc20ContextController>
              <Erc721ContextController>
                <TodosContextController>
                  <Navbar />

                  {children}
                </TodosContextController>
              </Erc721ContextController>
            </Erc20ContextController>
          </EvmSignatureVerificationContextController>
        </EvmWalletSelectorContextController>
      </body>
    </html>
  );
}
