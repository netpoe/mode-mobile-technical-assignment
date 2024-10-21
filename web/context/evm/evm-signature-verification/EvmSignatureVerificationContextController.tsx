"use client";

import React, { useEffect, useState } from "react";

import { EvmSignatureVerificationContext } from "./EvmSignatureVerificationContext";
import {
  EvmSignatureVerificationContextControllerProps,
  EvmSignatureVerificationContextType,
  OwnershipVerificationState,
} from "./EvmSignatureVerificationContext.types";
import { useAccount, useSignMessage } from "wagmi";

import { EVMSignatureVerificationService } from "@/lib/api-client/services/EVMSignatureVerificationService";
import { ZeroXAddress } from "@/lib/evm/evm.types";
import { useAppKit } from "@reown/appkit/react";

export const EvmSignatureVerificationContextController = ({
  children,
}: EvmSignatureVerificationContextControllerProps) => {
  const [message, setMessage] = useState<string>("");
  const [ownershipVerification, setOwnershipVerification] = useState<OwnershipVerificationState>({
    isVerifyingSignature: false,
    isSignatureVerified: false,
    isSignatureSent: false,
    isOwner: false,
  });

  const walletContext = useAccount();

  const web3Modal = useAppKit();

  const { data: signMessageData, error: signMessageError, signMessage } = useSignMessage();

  useEffect(() => {
    setMessage(
      `My Polygon Amoy address is ${walletContext.address}. I want to create ToDos by authenticating with my wallet.`,
    );
  }, [walletContext.address]);

  useEffect(() => {
    if (signMessageError) {
      console.error(signMessageError);
    }

    if (!signMessageData || ownershipVerification.isSignatureVerified || ownershipVerification.isVerifyingSignature)
      return;

    (async () => {
      setOwnershipVerification((prev) => ({ ...prev, isVerifyingSignature: true }));

      try {
        const response = await EVMSignatureVerificationService.verifySignature({
          address: walletContext.address as ZeroXAddress,
          signature: signMessageData,
          chainId: walletContext.chainId!,
          message,
        });

        setOwnershipVerification((prev) => ({
          ...prev,
          isSignatureVerified: response.isVerified,
          isOwner: response.isOwner,
          isSignatureSent: true,
        }));
      } catch (error) {
        console.error(error);
      }

      setOwnershipVerification((prev) => ({ ...prev, isVerifyingSignature: false }));
    })();
  }, [signMessageData]);

  function handleOnSignMessage() {
    if (walletContext.isConnected) {
      signMessage({
        message,
      });
    }
  }

  function handleOnDisplayWidgetClick() {
    if (walletContext.isConnected) {
      web3Modal.open({ view: "Account" });
    } else {
      web3Modal.open();
    }
  }

  const props: EvmSignatureVerificationContextType = {
    ownershipVerification,
    handleOnSignMessage,
    handleOnDisplayWidgetClick,
  };

  return <EvmSignatureVerificationContext.Provider value={props}>{children}</EvmSignatureVerificationContext.Provider>;
};
