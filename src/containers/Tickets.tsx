"use client";

import { CurrentTickets } from "@/components/CurrentTickets";
import { PreviousTickets } from "@/components/PreviousTickets";
import { useCurrentGame } from "@/hooks/useCurrentGame";
import { ErrorBoundary } from "react-error-boundary";

export function Tickets() {
  const { gameId } = useCurrentGame();

  return (
    <div className="space-y-14 mb-4">
      <ErrorBoundary fallback={<p>Error</p>}>
        <CurrentTickets />
      </ErrorBoundary>
      {gameId !== 0n && (
        <ErrorBoundary fallback={<p>Error</p>}>
          <PreviousTickets />
        </ErrorBoundary>
      )}
    </div>
  );
}
