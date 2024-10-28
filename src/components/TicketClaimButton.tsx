import { LOOTERY_ABI } from "@/abi/Lootery";
import { Button } from "@/components/ui/button";
import { CHAIN, CONTRACT_ADDRESS } from "@/config";
import { extractErrorMessages, handleTransactionError } from "@/lib/error";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import {
  usePublicClient,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export function TicketClaimButton({
  tokenId,
  onClaim,
}: {
  tokenId: bigint;
  onClaim?: () => void;
}) {
  const client = usePublicClient();

  const {
    data,
    isError,
    isPending: isSimulating,
  } = useSimulateContract({
    chainId: CHAIN.id,
    abi: LOOTERY_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "claimWinnings",
    args: [tokenId],
  });

  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const isLoading = isPending || isConfirming;

  async function handleClaim() {
    if (!data?.request) return;

    try {
      const hash = await writeContractAsync(data?.request);

      toast.promise(async () => client?.waitForTransactionReceipt({ hash }), {
        loading: "Waiting for confirmation…",
        action: {
          label: "Explorer",
          onClick(e) {
            e.preventDefault();
            window.open(
              `${CHAIN.blockExplorers.default.url}/tx/${hash}`,
              "_blank",
            );
          },
        },
        success: "Prize has been claimed!",
        error(error) {
          const { message } = extractErrorMessages(error);
          return message;
        },
        finally: () => onClaim?.(),
      });
    } catch (error) {
      handleTransactionError(error);
    }
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleClaim}
      disabled={isSimulating || isLoading || isConfirmed || isError}
    >
      {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
      Claim
    </Button>
  );
}
