import { Client, getContract } from "viem";
import ABI from "./TestERC721.json";
import { type Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { ZeroXAddress } from "../evm.types";

export const POLYGON_AMOY_DEFAULT_ERC721_ADDRESS = "0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46";

export class ERC721Instance {
  static defaultContractAddress = POLYGON_AMOY_DEFAULT_ERC721_ADDRESS as ZeroXAddress;
  static defaultABI = ABI.abi;

  contract: any;

  address: ZeroXAddress;

  name?: string;
  symbol?: string;
  balanceOf?: string = "0";

  writeContractFn?: WriteContractMutate<Config, unknown>;

  constructor(address: string, abi: any, client: Client) {
    this.address = address as ZeroXAddress;
    this.contract = getContract({
      address: address as ZeroXAddress,
      abi,
      client,
    });
  }

  setWriteContractHandler(_writeContractFn: WriteContractMutate<Config, unknown>) {
    this.writeContractFn = _writeContractFn;
  }

  async ownerOf(tokenId: number) {
    return await this.contract.read.ownerOf([BigInt(tokenId)]);
  }

  async tokenURI(tokenId: number) {
    return await this.contract.read.tokenURI([BigInt(tokenId)]);
  }

  async getName() {
    const _name = await this.contract.read.name();

    this.name = _name;

    return this;
  }

  async getSymbol() {
    const _symbol = await this.contract.read.symbol();

    this.symbol = _symbol;

    return this;
  }

  async getBalanceOf(address: ZeroXAddress): Promise<ERC721Instance> {
    if (!address) return this;

    try {
      const _balanceOf: bigint = await this.contract.read.balanceOf([address]);

      this.balanceOf = _balanceOf.toString();
    } catch (error) {
      console.error(error);
    }

    return this;
  }
}
