import { parseEther } from "viem";
import { ERC721Instance } from "./ERC721/ERC721Instance";
import { truncate } from "./format";
import { ERC20Instance } from "./ERC20/ERC20Instance";

export const DEFAULT_TX_CONFIRMATIONS_COUNT = 1;

const getBlockExplorerUrl = () =>
  process.env.NEXT_PUBLIC_DEFAULT_NETWORK_ENV === "testnet"
    ? "https://amoy.polygonscan.com/"
    : "https://polygonscan.com/";

const e = {
  ERC20Instance,
  ERC721Instance,
  getBlockExplorerUrl,
  parseEther,
  format: {
    truncate,
  },
  const: {
    DEFAULT_TX_CONFIRMATIONS_COUNT,
  },
};

export default e;
