import { Client, getContract, parseEther } from "viem";

import { ZeroXAddress } from "@/context/evm/wallet-selector/EvmWalletSelectorContext.types";
import { abi as _abi } from "./ERC20-ABI.json";

export const POLYGON_AMOY_DEFAULT_ADDRESS = "0xf02f35bF1C8D2c3a1e7255FD9AddC8F2182e0627";

export class ERC20Instance {
  static defaultContractAddress = POLYGON_AMOY_DEFAULT_ADDRESS;
  static defaultABI = _abi;

  contract: any;

  address: ZeroXAddress;

  name?: string;
  symbol?: string;
  balanceOf?: string;

  constructor(address: string, abi: any, client: Client) {
    this.address = address as ZeroXAddress;
    this.contract = getContract({
      address: address as ZeroXAddress,
      abi,
      client,
    });
  }

  async getName(): Promise<ERC20Instance> {
    const _name = await this.contract.read.name();

    this.name = _name;

    return this;
  }

  async getSymbol(): Promise<ERC20Instance> {
    const _symbol = await this.contract.read.symbol();

    this.symbol = _symbol;

    return this;
  }

  async getBalanceOf(address: ZeroXAddress): Promise<ERC20Instance> {
    if (!address) return this;

    try {
      const _balanceOf: BigInt = await this.contract.read.balanceOf([address]);

      this.balanceOf = parseEther(_balanceOf.toString()).toString();
    } catch (error) {
      console.error(error);
    }

    return this;
  }
}
