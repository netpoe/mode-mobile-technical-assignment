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
import { Toaster } from "@/components/ui/toaster";

const PPNeueMachina = localFont({
  src: [
    {
      path: "./fonts/PPNeueMachina-InktrapRegular.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina-InktrapSemibold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ppnneuemachina-sans",
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
      <body className={`${PPNeueMachina.variable} antialiased`}>
        <EvmWalletSelectorContextController cookies={cookies}>
          <EvmSignatureVerificationContextController>
            <TodosContextController>
              <Erc20ContextController>
                <Erc721ContextController>
                  <Navbar />

                  {children}

                  <Toaster />
                </Erc721ContextController>
              </Erc20ContextController>
            </TodosContextController>
          </EvmSignatureVerificationContextController>
        </EvmWalletSelectorContextController>
      </body>
    </html>
  );
}
