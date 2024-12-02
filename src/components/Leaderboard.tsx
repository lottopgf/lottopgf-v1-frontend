import { Skeleton } from "@/components/ui/skeleton";
import { CHAIN, CHAIN_NAME_MAPPING, CONTRACT_ADDRESS } from "@/config";
import { formatAddress } from "@/lib/format";
import Link from "next/link";
import * as v from "valibot";
import { getAddress } from "viem";

const LeaderboardResponseSchema = v.object({
  count: v.number(),
  top_collectors: v.array(
    v.object({
      owner_address: v.pipe(
        v.string(),
        v.transform((s) => getAddress(s)),
      ),
      owner_ens_name: v.nullable(v.string()),
      distinct_nfts_owned: v.number(),
      total_copies_owned: v.number(),
    }),
  ),
});

export async function getLeaderboard() {
  const apiKey = process.env.NEXT_PUBLIC_SIMPLEHASH_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_SIMPLEHASH_API_KEY is not set");
  }

  const chainName = CHAIN_NAME_MAPPING[CHAIN.id];
  const response = await fetch(
    `https://api.simplehash.com/api/v0/nfts/top_collectors/${chainName}/${CONTRACT_ADDRESS}?count=1&limit=50`,
    {
      headers: {
        "X-API-KEY": apiKey,
        accept: "application/json",
      },
    },
  );

  const data = await response.json();

  return v.parse(LeaderboardResponseSchema, data);
}

export async function Leaderboard() {
  const leaderboard = await getLeaderboard();

  return (
    <div className="flex flex-col divide-y divide-muted-foreground/20">
      {leaderboard.top_collectors.map((collector, _) => (
        <Link
          key={collector.owner_address}
          className="group flex items-center justify-between py-3"
          target="_blank"
          href={
            CHAIN.blockExplorers
              ? `${CHAIN.blockExplorers.default.url}/address/${collector.owner_address}`
              : ""
          }
        >
          <div className="leading-normal">
            {collector.owner_ens_name ? (
              <p className="text-lg font-medium underline-offset-2 group-hover:underline">
                {collector.owner_ens_name}
              </p>
            ) : (
              <p className="text-lg font-medium underline-offset-2 group-hover:underline">
                {formatAddress(collector.owner_address, 4)}
              </p>
            )}
          </div>
          <div className="text-2xl font-bold tabular-nums">
            {collector.distinct_nfts_owned}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-muted-foreground/20">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-4 text-2xl"
        >
          <Skeleton className="h-[1em] w-1/5" />
          <Skeleton className="h-[1em] w-8" />
        </div>
      ))}
    </div>
  );
}
