import { Client, formatEther, getContract, parseEther } from "viem";

import ABI from "./ERC20-ABI.json";
import { ZeroXAddress } from "../evm.types";
import { BalanceOf } from "./ERC20Instance.types";

export const POLYGON_AMOY_DEFAULT_ERC20_ADDRESS = "0xf02f35bF1C8D2c3a1e7255FD9AddC8F2182e0627";

export class ERC20Instance {
  static defaultContractAddress: ZeroXAddress = POLYGON_AMOY_DEFAULT_ERC20_ADDRESS;
  static defaultABI = ABI.abi;

  contract: any;

  address: ZeroXAddress;

  name?: string;
  symbol?: string;

  balanceOf?: BalanceOf = {
    value: 0n,
  };

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
}
