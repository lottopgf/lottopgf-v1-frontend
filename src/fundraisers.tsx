import { PRIZE_TOKEN_DECIMALS } from "@/config";
import type { ReactNode } from "react";
import { parseUnits, type Address } from "viem";

interface Fundraiser {
  title: string;
  description: ReactNode;
  targetAmount: bigint;
  address: Address;
}

export const FUNDRAISERS: Fundraiser[] = [
  {
    title: "LottoPGF Support",
    description: "Support development of the LottoPGF project!",
    targetAmount: parseUnits("0.42069", PRIZE_TOKEN_DECIMALS),
    address: "0x5C41B69dD754323e02Db39D63a639d658048E515",
  },
];
