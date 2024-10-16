import { ZeroXAddress } from "@/lib/evm/evm.types";

export type VerifySignatureRequest = {
  address: ZeroXAddress;
  signature: ZeroXAddress;
  chainId: number;
  message: string;
};

export type VerifySignatureResponse = { isVerified: boolean; isOwner: boolean };
