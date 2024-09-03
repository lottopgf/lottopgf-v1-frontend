import { CONTRACT_ADDRESS, GRAPHQL_API } from "@/config";
import { useSuspenseQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import type { Address } from "viem";

const winningNumbersQuery = gql`
  query winningPicks($lotteryId: String!, $gameId: String!) {
    lootery(id: $lotteryId) {
      id
      games(where: { id: $gameId }) {
        items {
          id
          gameId
          winningPicks
        }
      }
    }
  }
`;

interface WinningNumbersData {
  lootery: {
    games: {
      items: {
        winningPicks: number[];
      }[];
    };
  } | null;
}

export function useWinningNumbers({
  gameId,
  lotteryId = CONTRACT_ADDRESS,
  apiEndpoint = GRAPHQL_API,
}: {
  gameId: bigint | undefined;
  lotteryId?: Address;
  apiEndpoint?: string;
}) {
  const { data, ...rest } = useSuspenseQuery<WinningNumbersData | null>({
    queryKey: ["winningNumbers", lotteryId, gameId?.toString()],
    queryFn: async () => {
      if (gameId === undefined) return null;

      return request(apiEndpoint, winningNumbersQuery, {
        lotteryId,
        gameId: `${lotteryId}-${gameId?.toString()}`,
      });
    },
  });

  const numbers = data?.lootery?.games.items.at(0)?.winningPicks;

  return {
    ...rest,
    numbers,
    data,
  };
}
