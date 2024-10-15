import { ERC721Instance } from "./ERC721Instance";
import { truncate } from "./format";
import { localPublicClient, localWalletClient } from "./localViemClient";

const getBlockExplorerUrl = () =>
  process.env.NEXT_PUBLIC_DEFAULT_NETWORK_ENV === "testnet"
    ? "https://amoy.polygonscan.com/"
    : "https://polygonscan.com/";

const e = {
  ERC721Instance,
  getBlockExplorerUrl,
  format: {
    truncate,
  },
  localViemClients: {
    localPublicClient,
    localWalletClient,
  },
};

export default e;
