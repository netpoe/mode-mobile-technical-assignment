import { VerifySignatureRequest } from "@/lib/api-client/models/EVMSignatureVerification";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "@wagmi/core";
import wagmi from "@/lib/wagmi";
import { polygonAmoy } from "viem/chains";

export async function POST(request: NextRequest) {
  try {
    const body: VerifySignatureRequest = await request.json();

    const isVerified = await verifyMessage(wagmi.defaultConfig, {
      chainId: polygonAmoy.id,
      address: body.address,
      message: body.message,
      signature: body.signature,
    });

    return NextResponse.json({ isVerified, isOwner: isVerified });
  } catch (error) {
    console.error("Error verifying signature:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
