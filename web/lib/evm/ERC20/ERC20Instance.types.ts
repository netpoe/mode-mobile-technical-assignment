import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";

export type RefetchFnType = (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;

export type BalanceOf = {
  value: bigint;
  refetch?: RefetchFnType;
};
