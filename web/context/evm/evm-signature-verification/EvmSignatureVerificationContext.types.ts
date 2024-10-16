import { ReactNode } from "react";

export type EvmSignatureVerificationContextControllerProps = {
  children: ReactNode;
};

export type OwnershipVerificationState = {
  isVerifyingSignature: boolean;
  isSignatureVerified: boolean;
  isSignatureSent: boolean;
  isOwner: boolean;
};

export type EvmSignatureVerificationContextType = {
  ownershipVerification: OwnershipVerificationState;
  handleOnSignMessage: () => void;
  handleOnDisplayWidgetClick: () => void;
};
