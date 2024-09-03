import { useWinningNumbers } from "@/hooks/useWinningNumbers";

export function WinningNumbers({ gameId }: { gameId: bigint }) {
  const { numbers } = useWinningNumbers({ gameId });

  return <>{numbers ? <NumbersList numbers={numbers} /> : <span>–</span>}</>;
}

export function NumbersList({ numbers }: { numbers: number[] }) {
  return (
    <div className="flex gap-2">
      {numbers.map((number) => (
        <div
          key={number}
          className="bg-green-600 text-white size-12 flex items-center justify-center font-bold rounded-full text-xl"
        >
          {number}
        </div>
      ))}
    </div>
  );
}
