import { Client, getContract, parseEther } from "viem";
import ABI from "./ERC721-ABI.json";
import { type Config, UseWriteContractReturnType } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { ZeroXAddress } from "../evm.types";

export const POLYGON_AMOY_DEFAULT_ERC721_ADDRESS = "0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46";

export class ERC721Instance {
  static defaultContractAddress = POLYGON_AMOY_DEFAULT_ERC721_ADDRESS;
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
      const _balanceOf: BigInt = await this.contract.read.balanceOf([address]);

      this.balanceOf = _balanceOf.toString();
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  async mint() {
    try {
      if (!this.writeContractFn) {
        throw new Error("writeContractFn is not set");
      }

      this.writeContractFn({
        abi: ERC721Instance.defaultABI,
        address: ERC721Instance.defaultContractAddress as ZeroXAddress,
        functionName: "mint",
      });
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  async burn(tokenId: number) {
    try {
      if (!this.writeContractFn) {
        throw new Error("writeContractFn is not set");
      }

      this.writeContractFn({
        abi: ERC721Instance.defaultABI,
        address: ERC721Instance.defaultContractAddress as ZeroXAddress,
        functionName: "burn",
        args: [tokenId],
      });
    } catch (error) {
      console.error(error);
    }

    return this;
  }
}
