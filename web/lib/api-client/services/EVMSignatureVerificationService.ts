import { origin } from "@/hooks/useRoutes/useRoutes";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { VerifySignatureRequest, VerifySignatureResponse } from "../models/EVMSignatureVerification";

export class EVMSignatureVerificationService {
  /**
   * verifySignature
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static verifySignature(body?: VerifySignatureRequest): CancelablePromise<VerifySignatureResponse> {
    return __request(
      {
        ...OpenAPI,
        BASE: origin,
      },
      {
        method: "POST",
        url: "/api/evm/signature-verification",
        body,
        mediaType: "application/json",
      },
    );
  }
}
