import { LeaderboardSkeleton } from "@/components/Leaderboard";

export default function LeaderboardLoading() {
  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Leaderboard
      </h1>
      <LeaderboardSkeleton />
    </div>
  );
}
