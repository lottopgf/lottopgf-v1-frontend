import { LOOTERY_ABI } from "@/abi/Lootery";
import { CONTRACT_ADDRESS } from "@/config";
import { useGameData } from "@/hooks/useGameData";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ContractFunctionExecutionError } from "viem";
import { useConfig } from "wagmi";
import { readContractQueryOptions } from "wagmi/query";

export function useWinner({ gameId }: { gameId: bigint }) {
  const config = useConfig();

  const { winningPickId, isApocalypse } = useGameData({ gameId });

  const identityOptions = readContractQueryOptions(config, {
    abi: LOOTERY_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "tokenByPickIdentity",
    args: [gameId, winningPickId, 0n],
  });

  const { data: winningId } = useSuspenseQuery({
    ...identityOptions,
    queryFn: async (params) => {
      if (winningPickId) {
        try {
          return await identityOptions.queryFn(params);
        } catch (error) {
          if (error instanceof ContractFunctionExecutionError) {
            return null;
          }

          throw error;
        }
      }

      return null;
    },
  });

  const ownerOptions = readContractQueryOptions(config, {
    abi: LOOTERY_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "ownerOf",
    args: [winningId ?? 0n],
  });

  const { data: winningAddress, ...rest } = useSuspenseQuery({
    ...ownerOptions,
    queryFn: (params) => (winningId ? ownerOptions.queryFn(params) : null),
  });

  return {
    ...rest,
    winningId,
    winningAddress,
    isApocalypse,
  };
}
