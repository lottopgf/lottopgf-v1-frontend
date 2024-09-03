import { toast } from "sonner";
import {
  ContractFunctionExecutionError,
  TransactionExecutionError,
} from "viem";

export function handleTransactionError(error: any) {
  const { message, description } = extractErrorMessages(error);

  toast.error(message, {
    description,
  });
}

export function extractErrorMessages(error: any) {
  if (error instanceof ContractFunctionExecutionError) {
    return { message: error.message, description: error.details };
  } else if (error instanceof TransactionExecutionError) {
    return { message: error.shortMessage, description: error.details };
  } else {
    return { message: "An error occurred", description: "Please try again" };
  }
}
