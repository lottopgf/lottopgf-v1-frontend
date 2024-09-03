import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useWinner } from "@/hooks/useWinner";
import { formatAddress } from "@/lib/format";
import { PartyPopperIcon } from "lucide-react";
import Link from "next/link";
import ConfettiExplosion from "react-confetti-explosion";
import { withErrorBoundary } from "react-error-boundary";
import { isAddressEqual } from "viem";
import { useAccount } from "wagmi";

function WinnerAlertComponent({ gameId }: { gameId: bigint }) {
  const { address } = useAccount();
  const { winningId, winningAddress, isApocalypse } = useWinner({ gameId });

  if (isApocalypse) {
    return (
      <>
        <ConfettiExplosion />
        <Alert>
          <PartyPopperIcon className="size-4" />
          <AlertTitle>Everyone wins!</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>Every ticket holder wins an equal share of the jackpot!</p>
            <Button asChild>
              <Link href="/tickets">Check tickets</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (!winningId || !winningAddress) return null;

  return (
    <>
      <ConfettiExplosion />
      <Alert>
        <PartyPopperIcon className="size-4" />
        <AlertTitle>We have a winner!</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>
            {formatAddress(winningAddress)} won the last draw!
            {!!address && isAddressEqual(winningAddress, address) && (
              <>Congratulations! This is you!</>
            )}
          </p>
          <Button asChild>
            <Link href="/tickets">Check tickets</Link>
          </Button>
        </AlertDescription>
      </Alert>
    </>
  );
}

export const WinnerAlert = withErrorBoundary(WinnerAlertComponent, {
  fallback: null,
});
