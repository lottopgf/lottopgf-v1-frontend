import { PRIZE_TOKEN_DECIMALS } from "@/config";
import type { ReactNode } from "react";
import { parseUnits, type Address } from "viem";

interface Fundraiser {
  title: string;
  address: Address;
  description?: ReactNode;
  targetAmount?: bigint;
}

export const FUNDRAISERS: Fundraiser[] = [
  {
    title: "LottoPGF Support Fund",
    description: "Support development of the LottoPGF protocol!",
    targetAmount: parseUnits("0.42069", PRIZE_TOKEN_DECIMALS),
    address: "0x8220B74b87D77b11f6950dD2dFCe77D5D8971829",
  },
];
